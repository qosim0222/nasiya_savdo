import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  async create(createContractDto: CreateContractDto) {
    try {
      const data = await this.prisma.contract.create({
        data: createContractDto,
      });
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.contract.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.contract.findUnique({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Contract topilmadi');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    try {
      const exist = await this.prisma.contract.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Contract topilmadi');
      }

      const data = await this.prisma.contract.update({
        where: { id },
        data: updateContractDto,
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const exist = await this.prisma.contract.findUnique({ where: { id } });

      if (!exist) {
        throw new NotFoundException('Contract topilmadi');
      }

      const data = await this.prisma.contract.delete({ where: { id } });
      return { data };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
