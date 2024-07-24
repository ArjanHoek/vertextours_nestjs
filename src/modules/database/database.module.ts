import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => ({
        type: 'postgres',
        host: conf.get('DB_HOST'),
        port: +conf.get('DB_PORT'),
        username: conf.get('DB_USER'),
        password: conf.get('DB_PASS'),
        database: conf.get('DB_NAME'),
        entities: [
          User,
          Refuge,
          Stage,
          Tour,
          TourStage,
          Reservation,
          Room,
          Bed,
          BedReservation,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
