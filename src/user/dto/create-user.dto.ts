import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

 @ApiProperty({ example: '+998995931207' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998[0-9]{2}\d{7}$/, {
    message: 'The phone number format must be only: +998901234567.',
  })
  phone: string;

  @ApiProperty({ example: '1207' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  password: string;
  
  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: 0 })
  @IsNumber()
  balance: number;

  @ApiProperty({ example: "OWNER", enum: USER_ROLE })
  @IsEnum(USER_ROLE)
  role: USER_ROLE
}
