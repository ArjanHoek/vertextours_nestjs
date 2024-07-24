import { StageSeederService } from './stage.seeder';
import { TourSeederService } from './tour.seed';
import { TourStageSeederService } from './tourStage.seeder';
import { ReservationSeederService } from './reservation.seeder';
import { RoomSeederService } from './room.seeder';
import { RefugeSeederService } from './refuge.seeder';
import { UserSeederService } from './user.seeder';

export const seedersList = [
  UserSeederService,
  RefugeSeederService,
  StageSeederService,
  TourSeederService,
  TourStageSeederService,
  ReservationSeederService,
  RoomSeederService,
];
