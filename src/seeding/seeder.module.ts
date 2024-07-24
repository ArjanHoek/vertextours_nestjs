import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { SeederService } from './seeder.service';
import { ConfigModule } from '@nestjs/config';
import { UserSeederService } from './seeders/user.seeder';
import { RefugeSeederService } from './seeders/refuge.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentifierService } from './identifiers.service';
import {
  Bed,
  BedReservation,
  Refuge,
  Reservation,
  Room,
  Stage,
  Tour,
  TourStage,
  User,
} from 'src/entities';

const seedEntities = [
  User,
  Refuge,
  Stage,
  Tour,
  TourStage,
  Reservation,
  Room,
  Bed,
  BedReservation,
];
const seeders = [UserSeederService, RefugeSeederService];

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature(seedEntities),
  ],
  providers: [SeederService, IdentifierService, ...seeders],
})
export class SeederModule {}
