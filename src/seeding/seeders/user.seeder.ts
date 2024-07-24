import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdentifierService } from '../identifiers.service';
import { User } from 'src/entities/';
import users from '../data/user.data';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private identifierService: IdentifierService,
  ) {}

  async create() {
    for (const { password, email } of users) {
      const hash = await argon.hash(password);
      const newEntity = this.userRepository.create({ email, hash });
      const { id } = await this.userRepository.save(newEntity);
      this.identifierService.saveIdentifier('user', id);
    }
  }

  async clear() {
    await this.userRepository.delete({});
  }
}
