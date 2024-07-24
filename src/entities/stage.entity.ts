import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Refuge } from './';

@Entity()
export class Stage {
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

  @ManyToOne(() => Refuge, ({ starts_at }) => starts_at, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  from_refuge!: Refuge;

  @ManyToOne(() => Refuge, ({ ends_at }) => ends_at, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  to_refuge!: Refuge;
}
