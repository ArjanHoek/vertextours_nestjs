import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refuge } from 'src/entities/refuge.entity';
import { refuges } from './refuge.data';
import { UserSeederService } from '../user/user.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class RefugeSeederService {
  constructor(
    @InjectRepository(Refuge)
    private readonly refugeRepository: Repository<Refuge>,
    private userSeederService: UserSeederService,
  ) {}

  async create() {
    for (const { name, country, owner_index } of refuges) {
      const owner = this.userSeederService.ids[owner_index] as unknown as User;

      if (!owner) return;

      const newEntity = this.refugeRepository.create({ name, country, owner });
      await this.refugeRepository.save(newEntity);
    }
  }

  async clear() {
    await this.refugeRepository.delete({});
  }
}
