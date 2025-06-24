import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    try {
      const data = await this.prisma.partners.create({
        data: createPartnerDto,
      });
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.partners.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.partners.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Partner topilmadi');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      const partner = await this.prisma.partners.findUnique({ where: { id } });

      if (!partner) {
        throw new NotFoundException('Partner topilmadi');
      }

      const data = await this.prisma.partners.update({
        where: { id },
        data: updatePartnerDto,
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const partner = await this.prisma.partners.findUnique({ where: { id } });

      if (!partner) {
        throw new NotFoundException('Partner topilmadi');
      }

      const data = await this.prisma.partners.delete({ where: { id } });
      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
