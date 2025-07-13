import { ApiProperty } from '@nestjs/swagger';
import { UNIT_TYPE } from '@prisma/client';
import { IsBoolean, IsEnum,  IsNotEmpty,  IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'malibu' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 12000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: '14e6b3b2-aea9-437a-81c0-ef69e0dd76af' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 'PIECE', enum: UNIT_TYPE })
  @IsEnum(UNIT_TYPE)
  unit: UNIT_TYPE;

  @ApiProperty({ example: 'Yangi yetkazildi', required: false })
  @IsOptional()
  @IsString()
  comment?: string;



  @ApiProperty({ example: '1751273418799.jpg', required: false })
  @IsOptional()
  @IsString()
  image?:string

}
