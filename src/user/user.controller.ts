import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const users = await this.userService.findOne({ id });

    return {
      status: 'success',
      data: { users },
    };
  }
}
