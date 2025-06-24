import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateContractDto {
  @ApiProperty({ example: 'clpartner123' })
  @IsString()
  partnerId: string;

  @ApiProperty({ example: 'clproduct123' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 18000 })
  @IsNumber()
  sellPrice: number;

  @ApiProperty({ example: '2025-06-24' })
  @IsString()
  time: string;

  @ApiProperty({ example: 'cluser456' })
  @IsString()
  userId: string;
}
