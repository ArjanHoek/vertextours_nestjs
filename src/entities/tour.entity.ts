import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength } from 'class-validator';
import { TourStage, User } from './';

@Entity()
export class Tour {
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
  @MaxLength(40)
  name!: string;

  @ManyToOne(() => User, ({ tours_created }) => tours_created, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  created_by!: User;

  @OneToMany(() => TourStage, ({ tour }) => tour)
  stages!: TourStage[];
}
