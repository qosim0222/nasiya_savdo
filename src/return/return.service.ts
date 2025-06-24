import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';

@Injectable()
export class ReturnService {
  constructor(private prisma: PrismaService) {}

  async create(createReturnDto: CreateReturnDto) {
    try {
      const data = await this.prisma.return.create({
        data: createReturnDto,
      });
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.return.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.return.findUnique({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Return topilmadi');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateReturnDto: UpdateReturnDto) {
    try {
      const exist = await this.prisma.return.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Return topilmadi');
      }

      const data = await this.prisma.return.update({
        where: { id },
        data: updateReturnDto,
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const exist = await this.prisma.return.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Return topilmadi');
      }

      const data = await this.prisma.return.delete({ where: { id } });
      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
