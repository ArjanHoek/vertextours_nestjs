import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

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
}
