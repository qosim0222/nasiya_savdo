import { ApiProperty } from '@nestjs/swagger';
import { Units_Type } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Shakar 1kg' })
  @IsString()
  title: string;

  @ApiProperty({ example: 15000 })
  @IsNumber()
  sellPrice: number;

  @ApiProperty({ example: 12000 })
  @IsNumber()
  buyPrice: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 'clcat123' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 'KG', enum: Units_Type })
  @IsEnum(Units_Type)
  units: Units_Type;

  @ApiProperty({ example: 'Yangi yetkazildi', required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: 'cluser456' })
  @IsString()
  userId: string;
}
