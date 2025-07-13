import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSalaryDto) {
    return await this.prisma.salary.create({
      data,
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    userId?: string,
    sort: 'asc' | 'desc' = 'desc',
  ) {
    const where = userId ? { userId } : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.salary.findMany({
        where,
        orderBy: {
          createdAt: sort,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.salary.count({ where }),
    ]);

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
  async findMine(
    userId: string,
    page: number = 1,
    limit: number = 10,
    sort: 'asc' | 'desc' = 'desc',
  ) {
    const where = { userId };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.salary.findMany({
        where,
        orderBy: {
          createdAt: sort,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.salary.count({ where }),
    ]);

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const salary = await this.prisma.salary.findUnique({
      where: { id },
    });

    if (!salary) {
      throw new NotFoundException('salary topilmadi');
    }

    return salary;
  }

  async update(id: string, data: UpdateSalaryDto) {
    const salary = await this.prisma.salary.findUnique({
      where: { id },
    });

    if (!salary) {
      throw new NotFoundException('salary topilmadi');
    }

    const admin = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!admin) {
      throw new NotFoundException('admin topilmadi');
    }

    return this.prisma.salary.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const salary = await this.prisma.salary.findUnique({
      where: { id },
    });

    if (!salary) {
      throw new NotFoundException('salary topilmadi');
    }
    return this.prisma.salary.delete({
      where: { id },
    });
  }
}
