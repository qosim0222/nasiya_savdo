import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TYPE } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePaymentDto, userId: string) {
    const partner = await this.prisma.partners.findUnique({
      where: { id: data.partnerId },
    });
    if (!partner) {
      throw new NotFoundException('Partner topilmadi');
    }
    let debt: any | null = null;

    if (data.type === TYPE.IN) {
      await this.prisma.partners.update({
        where: { id: data.partnerId },
        data: { balance: { decrement: data.amount } },
      });
    }

    if (data.type === 'IN') {
      if (data.debtId) {
        debt = await this.prisma.debt.findUnique({
          where: { id: data.debtId },
        });

        if (!debt) {
          throw new NotFoundException('Debt topilmadi');
        }

        const newTotalPaid = debt.totalPaid + data.amount;
        const newRemaining = debt.remaining - data.amount;

        await this.prisma.debt.update({
          where: { id: data.debtId },
          data: {
            totalPaid: newTotalPaid,
            remaining: newRemaining > 0 ? newRemaining : 0,
            isClosed: newRemaining <= 0,
          },
        });
      }

      await this.prisma.partners.update({
        where: { id: data.partnerId },
        data: { balance: { increment: data.amount } },
      });
    }

    const payment = await this.prisma.payment.create({
      data: {
        ...data,
        userId,
      },
    });

    return payment;
  }

  async findAll(page: number, limit: number, partnerId?: string) {
    const skip = (page - 1) * limit;

    const where = partnerId ? { partnerId } : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          partner: {select:{fullname:true,phone:true}},
          user: {select:{fullname:true,phone:true}},
          debt: true,
        },
      }),
      this.prisma.payment.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException('payment topilmadi');
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const existing = await this.prisma.payment.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`Payment topilmadi`);
    }

    return await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException('payment topilmadi');
    }
    return await this.prisma.payment.delete({
      where: { id },
    });
  }
}
