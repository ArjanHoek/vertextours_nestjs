import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { refuges } from '../data/refuge.data';
import { IdentifierService } from '../identifiers.service';
import { User, Refuge } from 'src/entities/';

@Injectable()
export class RefugeSeederService {
  constructor(
    @InjectRepository(Refuge)
    private readonly refugeRepository: Repository<Refuge>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { name, country, owner_index } of refuges) {
      const owner = this.identifierService.getIdentifierAtIndex<User>(
        'user',
        owner_index,
      );

      if (!owner) continue;

      const newEntity = this.refugeRepository.create({ name, country, owner });
      const { id } = await this.refugeRepository.save(newEntity);

      this.identifierService.saveIdentifier('refuge', id);
    }
  }

  async clear() {
    await this.refugeRepository.delete({});
  }
}
