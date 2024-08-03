import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bed, BedReservation, Booking } from 'src/entities';
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
      booking_index,
    } of bedReservationData) {
      const bed = this.identifierService.getIdentifierAtIndex<Bed>(
        'bed',
        bed_index,
      );

      const booking = this.identifierService.getIdentifierAtIndex<Booking>(
        'booking',
        booking_index,
      );

      const newEntity = this.repository.create({
        half_board,
        date,
        bed,
        booking,
      });
      const { id } = await this.repository.save(newEntity);
      this.identifierService.saveIdentifier('bedReservation', id);
    }
  }

  async clear() {
    await this.repository.delete({});
  }
}
