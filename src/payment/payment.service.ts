import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const data = await this.prisma.payment.create({
        data: createPaymentDto,
      });
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.payment.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.payment.findUnique({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Payment topilmadi');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const exist = await this.prisma.payment.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Payment topilmadi');
      }

      const data = await this.prisma.payment.update({
        where: { id },
        data: updatePaymentDto,
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const exist = await this.prisma.payment.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Payment topilmadi');
      }

      const data = await this.prisma.payment.delete({ where: { id } });
      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
