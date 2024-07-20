import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: AuthDTO) {
    const data = await this.authService.login(dto);
    return {
      data,
    };
  }

  @Post('signup')
  async signup(@Body() dto: AuthDTO) {
    await this.authService.signup(dto);
    return { status: 'success' };
  }
}
