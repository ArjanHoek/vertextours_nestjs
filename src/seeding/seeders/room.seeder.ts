import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Refuge, Room } from 'src/entities';
import { Repository } from 'typeorm';
import { IdentifierService } from '../identifiers.service';
import { roomData } from '../data/room.data';

@Injectable()
export class RoomSeederService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { name, price, refuge_index } of roomData) {
      const refuge = this.identifierService.getIdentifierAtIndex<Refuge>(
        'refuge',
        refuge_index,
      );

      const newEntity = this.roomRepository.create({ name, price, refuge });
      const { id } = await this.roomRepository.save(newEntity);
      this.identifierService.saveIdentifier('room', id);
    }
  }

  async clear() {
    await this.roomRepository.delete({});
  }
}
