import { Bed } from './bed.entity';
import { BedReservation } from './bedReservation.entity';
import { User } from './user.entity';
import { Refuge } from './refuge.entity';
import { Reservation } from './reservation.entity';
import { Room } from './room.entity';
import { Stage } from './stage.entity';
import { Tour } from './tour.entity';
import { TourStage } from './tourStage.entity';

const entitiesList = [
  Bed,
  BedReservation,
  Refuge,
  Reservation,
  Room,
  Stage,
  Tour,
  TourStage,
  User,
];

export {
  Bed,
  BedReservation,
  Refuge,
  Reservation,
  Room,
  Stage,
  Tour,
  TourStage,
  User,
  entitiesList,
};
