import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
  ) {}

  public find() {
    return this.tourRepository.find({ select: { id: true, name: true } });
  }

  public async findOneById(id: string) {
    const tour = await this.tourRepository.findOne({
      where: { id },
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
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    const stages = tour.stages.map(({ id, order, stage }) => ({
      id,
      order,
      ...stage,
    }));

    return { ...tour, stages };
  }

  public async delete(id: string) {
    const { affected } = await this.tourRepository.delete(id);

    if (!affected) {
      throw new NotFoundException('Tour not found');
    }
  }
}
