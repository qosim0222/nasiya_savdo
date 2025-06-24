import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) {}

  async create(createSalaryDto: CreateSalaryDto) {
    try {
      const data = await this.prisma.salary.create({
        data: createSalaryDto,
      });
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.salary.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.salary.findUnique({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Salary topilmadi');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSalaryDto: UpdateSalaryDto) {
    try {
      const exist = await this.prisma.salary.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Salary topilmadi');
      }

      const data = await this.prisma.salary.update({
        where: { id },
        data: updateSalaryDto,
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const exist = await this.prisma.salary.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Salary topilmadi');
      }

      const data = await this.prisma.salary.delete({ where: { id } });
      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
