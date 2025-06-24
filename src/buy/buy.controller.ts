import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { Request } from 'express';

@Controller('buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  // @Post()
  // create(@Body()  createBuyDto: CreateBuyDto, @Req() req:Request) {
  //   const userId = req.user['id']
  //   return this.buyService.create(userId,createBuyDto);
  // }

  @Post()
create(@Body() createBuyDto: CreateBuyDto) {
  return this.buyService.create(createBuyDto);
}


  @Get()
  findAll() {
    return this.buyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyDto: UpdateBuyDto) {
    return this.buyService.update(id, updateBuyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyService.remove(id);
  }
}
