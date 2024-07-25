import { Tour } from 'src/entities';
import { FindOneOptions } from 'typeorm';

export const findOneOptions: FindOneOptions<Tour> = {
  relations: { stages: { stage: { from_refuge: true, to_refuge: true } } },
  select: {
    id: true,
    name: true,
    stages: {
      id: true,
      order: true,
      stage: {
        id: true,
        from_refuge: { id: true, name: true },
        to_refuge: { id: true, name: true },
      },
    },
  },
  order: { stages: { order: 'ASC' } },
};
