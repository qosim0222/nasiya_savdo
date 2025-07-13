import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


@Get()
@ApiQuery({ name: 'page', required: false, example: 1 })
@ApiQuery({ name: 'limit', required: false, example: 10 })
@ApiQuery({name: 'search',required: false,description: " fullname yoki telefoni bo'yicha qidirish",})
findAll(
  @Query('page') page?: string,
  @Query('limit') limit?: string,
  @Query('search') search?: string,
) {
  return this.userService.findAll(
    Number(page) || 1,
    Number(limit) || 10,
    search
  );
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
