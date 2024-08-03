import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Bed,
  BedReservation,
  Refuge,
  Booking,
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
      useFactory: (cfg: ConfigService) => {
        const database = cfg.get('DB_NAME');

        if (!database) {
          throw Error('.env file not correctly loaded');
        }

        return {
          database,
          type: 'postgres',
          host: cfg.get('DB_HOST'),
          port: +cfg.get('DB_PORT'),
          username: cfg.get('DB_USER'),
          password: cfg.get('DB_PASS'),
          entities: [
            User,
            Refuge,
            Stage,
            Tour,
            TourStage,
            Booking,
            Room,
            Bed,
            BedReservation,
          ],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
