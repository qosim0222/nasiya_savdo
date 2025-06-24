import { ApiProperty } from '@nestjs/swagger';
import { User_Role } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'ali123' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'securePassword' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: '+998901234567' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: 0 })
  @IsNumber()
  balance: number;

  @ApiProperty({ example: "OWNER", enum: User_Role })
  @IsEnum(User_Role)
  role: User_Role
}
