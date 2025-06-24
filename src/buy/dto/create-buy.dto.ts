import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

    
    @ApiProperty({ example: "121212545454"})
    @IsNotEmpty()
    @IsString()
    userId: string;
}
