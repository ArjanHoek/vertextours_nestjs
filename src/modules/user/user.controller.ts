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
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/enums';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getUsers() {
    return this.userService.find();
  }

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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete')
  delete(@Request() { jwtPayload: { sub: id } }: { jwtPayload: JwtPayload }) {
    return this.userService.deleteOne(id);
  }
}
