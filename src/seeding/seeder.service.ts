import { Injectable } from '@nestjs/common';
import { UserSeederService } from './user/user.service';
import { RefugeSeederService } from './refuge/refuge.service';

@Injectable()
export class SeederService {
  constructor(
    private userSeederService: UserSeederService,
    private refugeSeederService: RefugeSeederService,
  ) {}

  async seed() {
    await this.refugeSeederService.clear();
    await this.userSeederService.clear();

    await this.userSeederService.create();
    await this.refugeSeederService.create();
  }
}
