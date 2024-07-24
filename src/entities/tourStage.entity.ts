import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stage, Tour } from './';

@Entity()
export class TourStage {
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

  @ManyToOne(() => Stage, ({ id }) => id)
  stage!: Stage;

  @ManyToOne(() => Tour, ({ id }) => id)
  tour!: Tour;

  @Column()
  order!: number;
}
