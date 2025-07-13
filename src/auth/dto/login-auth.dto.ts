import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
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
}


export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh_token' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
