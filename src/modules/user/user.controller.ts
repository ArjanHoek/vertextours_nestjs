import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/modules/auth/guards';
import { JwtPayload } from 'src/types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(
    @Request() { jwtPayload: { sub: id } }: { jwtPayload: JwtPayload },
  ) {
    if (!id) {
      throw new UnauthorizedException('No id found in access token');
    }

    return this.userService.findOneById(id);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Request() { jwtPayload: { sub: id } }: { jwtPayload: JwtPayload }) {
    return this.userService.deleteOne(id);
  }
}
