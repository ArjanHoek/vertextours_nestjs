import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDTO) {
    return this.authService.login(dto);
  }

  @Post('register')
  public async register(@Body() dto: AuthDTO) {
    const user = await this.authService.register(dto);
    await this.authService.sendVerificationLink(user);
    return user;
  }

  @Patch('confirm')
  public confirm(@Query() { token }: { token: string }) {
    return this.authService.confirmRegistration(token);
  }
}
