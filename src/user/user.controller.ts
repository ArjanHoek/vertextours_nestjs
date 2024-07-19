import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll() {
    console.log('test');
    const users = await this.userService.findAll();
    return {
      status: 'success',
      data: { users },
    };
  }
}
