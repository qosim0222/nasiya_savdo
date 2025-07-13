import { ApiProperty } from "@nestjs/swagger";
import { PARTNERS_ROLE } from "@prisma/client";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";

export class CreatePartnerDto {
    @ApiProperty({ example: 'Rustam Toshmatov' })
    @IsString()
    fullname: string;


    @ApiProperty({ example: ['+998901112233'], isArray: true })
    @IsArray()
    @IsString({ each: true })
    phone: string[];


    @ApiProperty({ example: 'SELLER', enum: PARTNERS_ROLE })
    @IsEnum(PARTNERS_ROLE)
    role: PARTNERS_ROLE;

    @ApiProperty({ example: 'Toshkent, Chilonzor' })
    @IsString()
    address: string;
}

