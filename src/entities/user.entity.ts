import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Refuge, Reservation, Tour } from './';
import { Role } from 'src/modules/auth/enums';

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

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ unique: true })
  email!: string;

  @Column()
  hash!: string;

  @OneToMany(() => Refuge, ({ owner }) => owner)
  refuges!: Refuge[];

  @OneToMany(() => Tour, ({ created_by }) => created_by)
  tours_created!: Tour[];

  @OneToMany(() => Reservation, ({ user }) => user)
  reservations!: Reservation[];
}
