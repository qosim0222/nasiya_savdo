import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.decorator';
import { USER_ROLE } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}
 @UseGuards(AuthGuard, RolesGuard)
  @Roles(USER_ROLE.OWNER)
  @Post()
  create(@Body() createSalaryDto: CreateSalaryDto) {
    return this.salaryService.create(createSalaryDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(USER_ROLE.OWNER)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
    @Query('sort') sort?: 'asc' | 'desc',
  ) {
    return this.salaryService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
      userId,
      sort || 'desc',
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @Get('my')
  findMine(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: 'asc' | 'desc',
  ) {
    const userId = req.user.id;
    return this.salaryService.findMine(
      userId,
      Number(page) || 1,
      Number(limit) || 10,
      sort || 'desc',
    );
  }

   @UseGuards(AuthGuard, RolesGuard)
  @Roles(USER_ROLE.OWNER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(id);
  }
  
   @UseGuards(AuthGuard, RolesGuard)
  @Roles(USER_ROLE.OWNER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto) {
    return this.salaryService.update(id, updateSalaryDto);
  }
 
   @UseGuards(AuthGuard, RolesGuard)
  @Roles(USER_ROLE.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryService.remove(id);
  }
}
