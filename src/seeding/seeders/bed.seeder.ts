import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bed, Room } from 'src/entities';
import { Repository } from 'typeorm';
import { IdentifierService } from '../identifiers.service';
import { bedData } from '../data/bed.data';

@Injectable()
export class BedSeederService {
  constructor(
    @InjectRepository(Bed)
    private readonly repository: Repository<Bed>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { order, placement, room_index } of bedData) {
      const room = this.identifierService.getIdentifierAtIndex<Room>(
        'room',
        room_index,
      );

      const newEntity = this.repository.create({ order, placement, room });
      const { id } = await this.repository.save(newEntity);
      this.identifierService.saveIdentifier('bed', id);
    }
  }

  async clear() {
    await this.repository.delete({});
  }
}
