import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'phone' })
  @IsString()
  title: string;

  @ApiProperty({ example: '5' })
  @IsNumber()
  time: number;

  @ApiProperty({ example: 'image' })
  @IsString()
  image: string;

}
