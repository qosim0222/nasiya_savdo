import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.findFirst({
        where: { title: data.title },
      });

      if (category) {
        throw new ConflictException('Bunday kategoriya bor');
      }

      return await this.prisma.category.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.checkCategoryExists(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, data: UpdateCategoryDto) {
    try {
      await this.checkCategoryExists(id);
      return await this.prisma.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      await this.checkCategoryExists(id);
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async checkCategoryExists(id: string) {
    try {
      const category = await this.prisma.category.findUnique({ where: { id } });
      if (!category) {
        throw new NotFoundException('Bunday category yoq');
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
