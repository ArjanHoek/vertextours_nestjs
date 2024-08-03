import { StageSeederService } from './stage.seeder';
import { TourSeederService } from './tour.seed';
import { TourStageSeederService } from './tourStage.seeder';
import { RoomSeederService } from './room.seeder';
import { RefugeSeederService } from './refuge.seeder';
import { UserSeederService } from './user.seeder';
import { BedSeederService } from './bed.seeder';
import { BedReservationSeederService } from './bedReservation.seeder';
import { BookingSeederService } from './booking.seeder';

const seedersList = [
  UserSeederService,
  RefugeSeederService,
  StageSeederService,
  TourSeederService,
  TourStageSeederService,
  BookingSeederService,
  RoomSeederService,
  BedSeederService,
  BedReservationSeederService,
];

export {
  seedersList,
  UserSeederService,
  RefugeSeederService,
  StageSeederService,
  TourSeederService,
  TourStageSeederService,
  BookingSeederService,
  RoomSeederService,
  BedSeederService,
  BedReservationSeederService,
};
