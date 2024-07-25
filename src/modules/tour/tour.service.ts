import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'src/entities';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private repository: Repository<Tour>,
  ) {}

  public findAll() {
    return this.repository.find();
  }

  public findOne(where: FindOptionsWhere<Tour>) {
    return this.repository.findOne({ where });
  }
}
