import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(
    @Request() { jwtPayload: { sub: id } }: { jwtPayload: { sub: string } },
  ) {
    if (!id) {
      throw new NotFoundException();
    }

    const user = await this.userService.findOne({ id });

    return { user };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({ id });

    return { user };
  }
}
