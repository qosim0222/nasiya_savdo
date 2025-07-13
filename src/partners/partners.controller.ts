import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto, @Request() req) {
    const userId = req.user.id;
    return this.partnersService.create(createPartnerDto, userId);
  }

  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'role', required: false, enum: ['SELLER', 'CUSTOMER'] })
  @ApiQuery({ name: 'isActive', required: false})
  @ApiQuery({ name: 'isArchive', required: false })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'debtOnly', required: false})
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('role') role?: 'SELLER' | 'CUSTOMER',
    @Query('isActive') isActive?: string,
    @Query('isArchive') isArchive?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('debtOnly') debtOnly?: string,
  ) {
    const parsedIsActive =
      isActive === 'true' ? true : isActive === 'false' ? false : undefined;
    const parsedIsArchive =
      isArchive === 'true' ? true : isArchive === 'false' ? false : undefined;
    const parsedDebtOnly = debtOnly === 'true';

    return this.partnersService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
      search,
      role,
      parsedIsActive,
      parsedIsArchive,
      sortOrder,
      parsedDebtOnly,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.partnersService.update(id, updatePartnerDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
