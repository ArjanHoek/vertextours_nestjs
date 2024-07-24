import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room, Stage, User } from './';

@Entity()
export class Refuge {
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

  @Column({ unique: true })
  name!: string;

  @Column()
  country!: string;

  @ManyToOne(() => User, ({ refuges }) => refuges, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner!: User;

  @OneToMany(() => Stage, ({ from_refuge }) => from_refuge)
  starts_at!: Stage[];

  @OneToMany(() => Stage, ({ to_refuge }) => to_refuge)
  ends_at!: Stage[];

  @OneToMany(() => Room, ({ refuge }) => refuge)
  rooms!: Room[];
}
