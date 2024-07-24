import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage, Tour, TourStage } from 'src/entities';
import { Repository } from 'typeorm';
import { IdentifierService } from '../identifiers.service';
import { tourStageData } from '../data/tourStage.data';

@Injectable()
export class TourStageSeederService {
  constructor(
    @InjectRepository(TourStage)
    private readonly tourStageRepository: Repository<TourStage>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { order, stage_index, tour_index } of tourStageData) {
      const stage = this.identifierService.getIdentifierAtIndex<Stage>(
        'stage',
        stage_index,
      );

      const tour = this.identifierService.getIdentifierAtIndex<Tour>(
        'tour',
        tour_index,
      );

      const newEntity = this.tourStageRepository.create({ order, stage, tour });
      const { id } = await this.tourStageRepository.save(newEntity);
      this.identifierService.saveIdentifier('tourStage', id);
    }
  }

  async clear() {
    await this.tourStageRepository.delete({});
  }
}
