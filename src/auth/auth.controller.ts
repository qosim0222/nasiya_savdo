import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RefreshTokenDto } from './dto/login-auth.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  
  @UseGuards(AuthGuard)
  @Get('my_data')
  me(@Req() req: Request) {
    return this.authService.me_data(req);
  }
}

