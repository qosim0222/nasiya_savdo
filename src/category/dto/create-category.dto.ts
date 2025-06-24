import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Oziq-ovqat' })
  @IsString()
  title: string;

  @ApiProperty({ example: '2025-06-24T00:00:00.000Z' })
  @IsString()
  time: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}
