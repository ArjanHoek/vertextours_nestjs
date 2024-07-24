import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation, User } from 'src/entities';
import { Repository } from 'typeorm';
import { IdentifierService } from '../identifiers.service';
import { reservationData } from '../data/reservation.data';

@Injectable()
export class ReservationSeederService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { user_index, comments } of reservationData) {
      const user = this.identifierService.getIdentifierAtIndex<User>(
        'user',
        user_index,
      );

      const newEntity = this.reservationRepository.create({ comments, user });
      const { id } = await this.reservationRepository.save(newEntity);
      this.identifierService.saveIdentifier('reservation', id);
    }
  }

  async clear() {
    await this.reservationRepository.delete({});
  }
}
