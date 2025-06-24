import { ApiProperty } from '@nestjs/swagger';
import { Payment_Type, Type } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'clpartner789' })
  @IsString()
  partnerId: string;

  @ApiProperty({ example: 'cldebt888' })
  @IsString()
  debtId: string;

  @ApiProperty({ example: 'cluser456' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 250000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "To'liq to'lov", required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ example: 'CASH', enum: Payment_Type })
  @IsEnum(Payment_Type)
  paymentType: Payment_Type;

  @ApiProperty({ example: 'IN', enum: Type })
  @IsEnum(Type)
  type: Type;
}
