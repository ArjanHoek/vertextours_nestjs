import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Refuge } from 'src/entities/refuge.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RefugeService {
  constructor(
    @InjectRepository(Refuge)
    private refugeRepository: Repository<Refuge>,
  ) {}

  findOne(where: FindOptionsWhere<Refuge>) {
    return this.refugeRepository.findOne({
      where,
      select: {
        id: true,
        name: true,
      },
    });
  }

  find(where: FindOptionsWhere<Refuge> = {}) {
    return this.refugeRepository.find({
      where,
      select: {
        id: true,
        name: true,
      },
    });
  }
}
