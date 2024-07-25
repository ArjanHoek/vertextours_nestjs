import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Bed, Reservation } from './';

@Entity()
@Unique('bed already has a reservation on this date', ['date', 'bed'])
export class BedReservation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;

  @Column()
  date!: Date;

  @Column()
  half_board!: boolean;

  @ManyToOne(() => Bed, ({ reservations }) => reservations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  bed!: Bed;

  @ManyToOne(() => Reservation, ({ beds }) => beds, { onDelete: 'CASCADE' })
  reservation!: Reservation;
}
