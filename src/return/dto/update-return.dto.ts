import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateReturnDto } from './create-return.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateReturnDto extends PartialType(CreateReturnDto) {
     @ApiPropertyOptional({
        example: 'Wrong item delivered',
        description: 'Updated reason for returning the product',
    })
    @IsString()
    @IsOptional()
    reason?: string;

    @ApiPropertyOptional({
        example: false,
        description: 'Update whether the returned product is new or used',
    })
    @IsBoolean()
    @IsOptional()
    isNew?: boolean;

    @ApiPropertyOptional({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'Updated contract ID associated with the return',
    })
    @IsString()
    @IsOptional()
    contractId?: string;
}

