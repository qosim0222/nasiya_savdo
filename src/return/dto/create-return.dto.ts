import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateReturnDto {
  @ApiProperty({ example: 'clcontract123' })
  @IsString()
  contractId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isNew: boolean;

  @ApiProperty({ example: 'Yaroqsiz mahsulot' })
  @IsString()
  reason: string;
}
