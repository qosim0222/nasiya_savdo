import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    try {
      let { price, quantity, categoryId } = data;

      const category = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category topilmadi');
      }

      price = price || 0;
      quantity = quantity || 0;
      const totalPrice = price * quantity;

      return await this.prisma.product.create({
        data: { ...data, totalPrice },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    categoryId?: string,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    name?: string,
  ) {
    try {
      const skip = (page - 1) * limit;
      const where: any = {};

      if (categoryId) where.categoryId = categoryId;
      if (name) where.title = { contains: name, mode: 'insensitive' };

      const [products, total] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          skip,
          take: limit,
          where,
          orderBy: {
            [sortBy]: sortOrder,
          },
        }),
        this.prisma.product.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: products,
        total,
        currentPage: page,
        totalPages,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Bunday product yoq');
      }

      return product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, data: UpdateProductDto) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException("Bunday product yo'q");
      }

      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException("Bunday product yo'q");
      }

      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
