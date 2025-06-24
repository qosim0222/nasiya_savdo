import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Injectable()
export class DebtService {
  constructor(private prisma: PrismaService) {}

  async create(createDebtDto: CreateDebtDto) {
    try {
      const data = await this.prisma.debt.create({
        data: createDebtDto,
      });
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.debt.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.debt.findUnique({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Debt topilmadi');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateDebtDto: UpdateDebtDto) {
    try {
      const exist = await this.prisma.debt.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Debt topilmadi');
      }

      const data = await this.prisma.debt.update({
        where: { id },
        data: updateDebtDto,
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const exist = await this.prisma.debt.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Debt topilmadi');
      }

      const data = await this.prisma.debt.delete({ where: { id } });
      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
