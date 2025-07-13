import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReturnService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.return.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const returnSingle = await this.prisma.return.findUnique({
        where: { id },
      });

      if (!returnSingle) {
        throw new NotFoundException('Bu ID li return topilmadi');
      }

      return returnSingle;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateReturnDto: UpdateReturnDto) {
    try {
      const returnSingle = await this.prisma.return.findUnique({
        where: { id },
      });

      if (!returnSingle) {
        throw new NotFoundException('Bu ID li return topilmadi');
      }

      return await this.prisma.return.update({
        where: { id },
        data: updateReturnDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const returnSingle = await this.prisma.return.findUnique({
        where: { id },
      });

      if (!returnSingle) {
        throw new NotFoundException('Bu ID li return topilmadi');
      }

      return await this.prisma.return.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
