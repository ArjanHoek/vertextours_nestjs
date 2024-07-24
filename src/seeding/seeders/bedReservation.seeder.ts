import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bed, BedReservation, Reservation } from 'src/entities';
import { Repository } from 'typeorm';
import { IdentifierService } from '../identifiers.service';
import { bedReservationData } from '../data/bedReservation.data';

@Injectable()
export class BedReservationSeederService {
  constructor(
    @InjectRepository(BedReservation)
    private readonly repository: Repository<BedReservation>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const {
      half_board,
      date,
      bed_index,
      reservation_index,
    } of bedReservationData) {
      const bed = this.identifierService.getIdentifierAtIndex<Bed>(
        'bed',
        bed_index,
      );

      const reservation =
        this.identifierService.getIdentifierAtIndex<Reservation>(
          'reservation',
          reservation_index,
        );

      const newEntity = this.repository.create({
        half_board,
        date,
        bed,
        reservation,
      });
      const { id } = await this.repository.save(newEntity);
      this.identifierService.saveIdentifier('bedReservation', id);
    }
  }

  async clear() {
    await this.repository.delete({});
  }
}
