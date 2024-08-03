import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { SeederService } from './seeder.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentifierService } from './identifiers.service';
import { seedersList } from './seeders';
import {
  Refuge,
  User,
  Stage,
  Tour,
  TourStage,
  Reservation,
  Room,
  Bed,
  BedReservation,
} from 'src/entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([
      User,
      Refuge,
      Stage,
      Tour,
      TourStage,
      Reservation,
      Room,
      Bed,
      BedReservation,
    ]),
  ],
  providers: [SeederService, IdentifierService, ...seedersList],
})
export class SeederModule {}
