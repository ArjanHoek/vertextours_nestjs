import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Refuge } from './refuge.entity';

@Entity()
export class User {
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
  email!: string;

  @Column()
  hash!: string;

  @OneToMany(() => Refuge, ({ owner }) => owner)
  refuges!: Refuge[];
}
