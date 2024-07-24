import { Injectable } from '@nestjs/common';
import { UserSeederService } from './seeders/user.seeder';
import { RefugeSeederService } from './seeders/refuge.seeder';
import { StageSeederService } from './seeders/stage.seeder';
import { TourSeederService } from './seeders/tour.seed';
import { TourStageSeederService } from './seeders/tourStage.seeder';

@Injectable()
export class SeederService {
  constructor(
    private userSeederService: UserSeederService,
    private refugeSeederService: RefugeSeederService,
    private stageSeederService: StageSeederService,
    private tourSeederService: TourSeederService,
    private tourStageSeederService: TourStageSeederService,
  ) {}

  async seed() {
    await this.clearAll();
    await this.createAll();
  }

  async clearAll() {
    await this.tourStageSeederService.clear();
    await this.stageSeederService.clear();
    await this.tourSeederService.clear();

    await this.refugeSeederService.clear();
    await this.userSeederService.clear();
  }

  async createAll() {
    await this.userSeederService.create();
    await this.refugeSeederService.create();

    await this.stageSeederService.create();
    await this.tourSeederService.create();
    await this.tourStageSeederService.create();
  }
}
