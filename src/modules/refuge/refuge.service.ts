import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Refuge } from 'src/entities/refuge.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RefugeDto, UpdateRefugeDto } from './dto/refuge.dto';

@Injectable()
export class RefugeService {
  constructor(
    @InjectRepository(Refuge)
    private refugeRepository: Repository<Refuge>,
  ) {}

  find(where: FindOptionsWhere<Refuge> = {}) {
    return this.refugeRepository.find({
      where,
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(where: FindOptionsWhere<Refuge>) {
    return this.refugeRepository.findOne({
      where,
      select: {
        id: true,
        name: true,
      },
    });
  }

  createOne(dto: RefugeDto) {
    return this.refugeRepository.save(dto);
  }

  updateOne(id: string, dto: UpdateRefugeDto) {
    return this.refugeRepository.save({ ...dto, id });
  }

  deleteOne(id: string) {
    return this.refugeRepository.delete(id);
  }
}
