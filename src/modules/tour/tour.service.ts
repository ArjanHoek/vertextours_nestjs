import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'src/entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private repository: Repository<Tour>,
  ) {}

  public findAll(findManyOptions: FindManyOptions<Tour>) {
    return this.repository.find(findManyOptions);
  }

  public findOne(findOneOptions: FindOneOptions<Tour>) {
    return this.repository.findOne(findOneOptions);
  }

  public deleteOne(id: string) {
    return this.repository.delete(id);
  }
}
