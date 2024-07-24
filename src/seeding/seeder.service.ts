import { Injectable } from '@nestjs/common';
import {
  UserSeederService,
  RefugeSeederService,
  StageSeederService,
  TourSeederService,
  TourStageSeederService,
  ReservationSeederService,
  RoomSeederService,
  BedSeederService,
  BedReservationSeederService,
} from './seeders/';

@Injectable()
export class SeederService {
  private clearOrder = [
    this.bedReservationSeederService,
    this.bedSeederService,
    this.roomSeederService,
    this.reservationSeederService,
    this.tourStageSeederService,
    this.tourSeederService,
    this.stageSeederService,
    this.refugeSeederService,
    this.userSeederService,
  ];

  private createOrder = [...this.clearOrder].reverse();

  constructor(
    private userSeederService: UserSeederService,
    private refugeSeederService: RefugeSeederService,
    private stageSeederService: StageSeederService,
    private tourSeederService: TourSeederService,
    private tourStageSeederService: TourStageSeederService,
    private reservationSeederService: ReservationSeederService,
    private roomSeederService: RoomSeederService,
    private bedSeederService: BedSeederService,
    private bedReservationSeederService: BedReservationSeederService,
  ) {}

  async seed() {
    for (const service of this.clearOrder) {
      await service.clear();
    }
    for (const service of this.createOrder) {
      await service.create();
    }
  }
}
