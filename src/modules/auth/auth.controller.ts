import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { AuthGuard } from './auth.guard';
import { JwtPayload } from 'src/types';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() dto: AuthDTO) {
    const access_token = await this.authService.signIn(dto);
    return { access_token };
  }

  @Post('signup')
  async signUp(@Body() dto: AuthDTO) {
    const access_token = await this.authService.signUp(dto);
    return { access_token };
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(
    @Request() { jwtPayload: { sub: id } }: { jwtPayload: JwtPayload },
  ) {
    return this.userService.deleteOne(id);
  }
}
