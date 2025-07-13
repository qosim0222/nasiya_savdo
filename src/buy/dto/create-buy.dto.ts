import { ApiProperty } from "@nestjs/swagger";
import { UNIT_TYPE } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBuyDto {
    @ApiProperty({ example: "clx0def456uvw789", description: "Hamkor (partner) IDsi" })
    @IsNotEmpty()
    @IsString()
    partnerId: string;

    @ApiProperty({ example: "clx0ghi789rst012", description: "Mahsulot IDsi" })
    @IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty({ example: 10, description: "Mahsulot miqdori" })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ example: 20000, description: "Mahsulot xarid narxi" })
    @IsNotEmpty()
    @IsNumber()
    buyPrice: number;

    @ApiProperty({ example: "Yetkazib berildi", required: false, description: "Izoh (ixtiyoriy)" })
    @IsOptional()
    @IsString()
    comment?: string;

    @ApiProperty({ example: 'd58efbe4-3b7f-4f10-b07e-2c362e8d9dd3' })
    @IsUUID()
    @IsString()
    categoryId: string;

    @ApiProperty({ example: 'PIECE', enum: UNIT_TYPE })
    @IsEnum(UNIT_TYPE)
    unit: UNIT_TYPE;

    @ApiProperty({ example: 'telefon' })
    @IsNotEmpty()
    @IsString()
    title: string;
}

