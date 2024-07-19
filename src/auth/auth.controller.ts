import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    const data = this.authService.login();
    return {
      status: 'success',
      data,
    };
  }

  @Post('signup')
  async signup(@Body() dto: AuthDTO) {
    await this.authService.signup(dto);
    return { status: 'success' };
  }
}
