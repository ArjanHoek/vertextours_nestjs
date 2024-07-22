import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() dto: AuthDTO) {
    const user = await this.authService.signIn(dto);
    return { status: 'success', data: { user } };
  }

  @Post('signup')
  async signUp(@Body() dto: AuthDTO) {
    const user = await this.authService.signUp(dto);
    return { status: 'success', data: { user } };
  }
}
