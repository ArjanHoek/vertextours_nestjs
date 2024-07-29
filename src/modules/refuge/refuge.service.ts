import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Refuge } from 'src/entities/refuge.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateRefugeDto, UpdateRefugeDto } from './dto';

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
        country: true,
      },
    });
  }

  public async findOne(where: FindOptionsWhere<Refuge>) {
    const refuge = await this.refugeRepository.findOne({
      where,
      select: {
        id: true,
        name: true,
        country: true,
      },
    });

    if (!refuge) {
      throw new NotFoundException();
    }

    return refuge;
  }

  public async createOne(dto: CreateRefugeDto) {
    const refuge = this.refugeRepository.create(dto);

    try {
      return await this.refugeRepository.save(refuge);
    } catch (error) {
      const { code, detail } = error;

      if (code === '23503') {
        throw new BadRequestException(detail);
      }

      if (code === '23505') {
        throw new ConflictException(detail);
      }

      throw error;
    }
  }

  public async updateOne(id: string, dto: UpdateRefugeDto) {
    const { affected } = await this.refugeRepository.update(id, dto);

    if (!affected) {
      throw new NotFoundException();
    }
  }

  public async deleteOne(id: string) {
    const { affected } = await this.refugeRepository.delete(id);

    if (!affected) {
      throw new NotFoundException('Refuge not found');
    }
  }
}
