import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BuyService {
  constructor(private prisma: PrismaService) { }

//   async create(userId: string, createBuyDto: CreateBuyDto) {
//   try {
//     const data = await this.prisma.buy.create({
//       data: {
//         ...createBuyDto,
//         userId, 
//       },
//     });
//     return { data };
//   } catch (error) {
//     throw new BadRequestException(error.message);
//   }
// }


  async create(createBuyDto: CreateBuyDto) {

    try {
      let data = await this.prisma.buy.create({ data: createBuyDto })
      return { data }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new BadRequestException(error.message)
    }

  }

  async findAll() {
    try {
      let data = await this.prisma.buy.findMany()
      return { data }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.buy.findUnique({ where: { id } })

      if (!data) {
        throw new NotFoundException("Not found buy")
      }
      return { data }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new BadRequestException(error.message)
    }
  }

  async update(id: string, updateBuyDto: UpdateBuyDto) {

    try {
      let data = await this.prisma.buy.findUnique({ where: { id } })

      if (!data) {
        throw new NotFoundException("Not found buy")
      }

      data = await this.prisma.buy.update({
        where: { id },
        data: updateBuyDto
      })

      return { data }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string) {
    try {
      let data = await this.prisma.buy.findUnique({ where: { id } })

      if (!data) {
        throw new NotFoundException("Not found buy")
      }

      data = await this.prisma.buy.delete({ where: { id } })
      return { data }


    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new BadRequestException(error.message)
    }
  }
}
