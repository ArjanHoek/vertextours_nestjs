import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour, User } from 'src/entities';
import { IdentifierService } from '../identifiers.service';
import { Repository } from 'typeorm';
import { tours } from '../data/tour.data';

@Injectable()
export class TourSeederService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { name, created_by_index } of tours) {
      const created_by = this.identifierService.getIdentifierAtIndex<User>(
        'user',
        created_by_index,
      );

      const newEntity = this.tourRepository.create({ name, created_by });
      const { id } = await this.tourRepository.save(newEntity);
      this.identifierService.saveIdentifier('tour', id);
    }
  }

  async clear() {
    await this.tourRepository.delete({});
  }
}
