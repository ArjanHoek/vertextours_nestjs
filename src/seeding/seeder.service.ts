import { Injectable } from '@nestjs/common';
import { UserSeederService } from './user/user.service';

@Injectable()
export class SeederService {
  constructor(private readonly userSeederService: UserSeederService) {}

  async seed() {
    await this.userSeederService.clear();

    const userIds = await this.userSeederService.create();
    console.log(userIds);
  }
}
