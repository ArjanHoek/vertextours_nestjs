import { IsIn } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BedReservation, Room } from './';

const placementOptions = ['start', 'between', 'end', 'stretch'];

@Entity()
export class Bed {
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

  @Column({ type: 'integer' })
  order!: number;

  @Column()
  @IsIn(placementOptions)
  placement!: string;

  @ManyToOne(() => Room, ({ beds }) => beds, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  room!: Room;

  @OneToMany(() => BedReservation, ({ bed }) => bed)
  reservations!: BedReservation[];
}
