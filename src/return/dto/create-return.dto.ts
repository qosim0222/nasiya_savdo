import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateReturnDto {
  @ApiProperty({ example: '89b77a08-be6e-4c0b-9a15-017d28af7' })
  @IsString()
  contractId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isNew: boolean;

  @ApiProperty({ example: 'Yaroqsiz mahsulot' })
  @IsString()
  reason: string;
}
