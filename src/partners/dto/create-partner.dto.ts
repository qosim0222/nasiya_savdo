import { ApiProperty } from "@nestjs/swagger";
import { Partners_Role } from "@prisma/client";
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";

export class CreatePartnerDto {
    @ApiProperty({ example: 'Rustam Toshmatov' })
    @IsString()
    fullname: string;

    @ApiProperty({ example: '+998901112233' })
    @IsString()
    phone: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({ example: 50000 })
    @IsNumber()
    balance: number;

    @ApiProperty({ example: 'CUSTOMER', enum: Partners_Role })
    @IsEnum(Partners_Role)
    role: Partners_Role;

    @ApiProperty({ example: 'Toshkent, Chilonzor' })
    @IsString()
    address: string;

    @ApiProperty({ example: 'cluser123' })
    @IsString()
    userId: string;
}
