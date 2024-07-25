import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'src/entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { findOneOptions } from './query/findOneOptions';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private repository: Repository<Tour>,
  ) {}

  public findAll() {
    return this.repository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  public async findOne(where: FindOptionsWhere<Tour>) {
    const result = await this.repository.findOne({ where, ...findOneOptions });
    return {
      ...result,
      stages: result.stages.map(({ stage }) => stage),
    };
  }
}
