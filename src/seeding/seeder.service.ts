import { Injectable } from '@nestjs/common';
import { UserSeederService } from './seeders/user.seeder';
import { RefugeSeederService } from './seeders/refuge.seeder';

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
