import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDebtDto {
  @ApiProperty({ example: 'clcontract123' })
  @IsString()
  contractId: string;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  total: number;

  @ApiProperty({ example: '2025-06-24' })
  @IsString()
  time: string;
}
