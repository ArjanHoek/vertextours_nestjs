import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bed, Refuge } from './';

@Entity()
export class Room {
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

  @Column({ length: 25 })
  name!: string;

  @Column({ type: 'real' })
  price!: number;

  @ManyToOne(() => Refuge, ({ rooms }) => rooms, { onDelete: 'CASCADE' })
  refuge!: Refuge;

  @OneToMany(() => Bed, ({ room }) => room)
  beds!: Bed[];
}
