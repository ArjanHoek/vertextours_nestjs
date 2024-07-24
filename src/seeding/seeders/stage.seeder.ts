import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdentifierService } from '../identifiers.service';
import { Refuge, Stage } from 'src/entities';
import { stages } from '../data/stage.data';

@Injectable()
export class StageSeederService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { from_refuge_index, to_refuge_index } of stages) {
      const from_refuge = this.identifierService.getIdentifierAtIndex<Refuge>(
        'refuge',
        from_refuge_index,
      );

      const to_refuge = this.identifierService.getIdentifierAtIndex<Refuge>(
        'refuge',
        to_refuge_index,
      );

      const newEntity = this.stageRepository.create({ from_refuge, to_refuge });
      await this.stageRepository.save(newEntity);
    }
  }

  async clear() {
    await this.stageRepository.delete({});
  }
}
