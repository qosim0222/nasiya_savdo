import { ApiProperty } from '@nestjs/swagger';
import { PAYMENT_TYPE, TYPE } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'asass121sa1sas2a' })
  @IsString()
  partnerId: string;

  @ApiProperty({ example: 'cldebt888' })
  @IsString()
  debtId: string;


  @ApiProperty({ example: 250000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "To'liq to'lov", required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ example: 'CASH', enum: PAYMENT_TYPE })
  @IsEnum(PAYMENT_TYPE)
  paymentType: PAYMENT_TYPE;

  @ApiProperty({ example: 'IN', enum: TYPE })
  @IsEnum(TYPE)
  type: TYPE;
}
