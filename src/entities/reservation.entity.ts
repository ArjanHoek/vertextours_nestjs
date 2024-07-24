import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BedReservation, User } from './';

@Entity()
export class Reservation {
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

  @Column({ length: 400 })
  comments!: string;

  @ManyToOne(() => User, ({ id }) => id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;

  @OneToMany(() => BedReservation, ({ reservation }) => reservation)
  beds!: BedReservation[];
}
