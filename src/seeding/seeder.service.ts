import { Injectable } from '@nestjs/common';
import { UserSeederService } from './seeders/user.seeder';
import { RefugeSeederService } from './seeders/refuge.seeder';
import { StageSeederService } from './seeders/stage.seeder';

@Injectable()
export class SeederService {
  constructor(
    private userSeederService: UserSeederService,
    private refugeSeederService: RefugeSeederService,
    private stageSeederService: StageSeederService,
  ) {}

  async seed() {
    await this.stageSeederService.clear();
    await this.refugeSeederService.clear();
    await this.userSeederService.clear();

    await this.userSeederService.create();
    await this.refugeSeederService.create();
    await this.stageSeederService.create();
  }
}
