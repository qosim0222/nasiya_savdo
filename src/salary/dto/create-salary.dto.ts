import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSalaryDto {
  @ApiProperty({ example: 'cluser456' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 1200000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'Iyun oyligi', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
