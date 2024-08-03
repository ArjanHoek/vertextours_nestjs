import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, User } from 'src/entities';
import { Repository } from 'typeorm';
import { IdentifierService } from '../identifiers.service';
import { bookingData } from '../data/booking.data';

@Injectable()
export class BookingSeederService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { user_index, comments } of bookingData) {
      const user = this.identifierService.getIdentifierAtIndex<User>(
        'user',
        user_index,
      );

      const newEntity = this.bookingRepository.create({ comments, user });
      const { id } = await this.bookingRepository.save(newEntity);
      this.identifierService.saveIdentifier('booking', id);
    }
  }

  async clear() {
    await this.bookingRepository.delete({});
  }
}
