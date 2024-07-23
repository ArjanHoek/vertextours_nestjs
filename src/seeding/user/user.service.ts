import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import users from './user.data';

@Injectable()
export class UserSeederService {
  public ids: string[] = [];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create() {
    for (const { password, email } of users) {
      const hash = await argon.hash(password);
      const newEntity = this.userRepository.create({ email, hash });
      const { id } = await this.userRepository.save(newEntity);
      this.ids.push(id);
    }
  }

  async clear() {
    await this.userRepository.delete({});
  }
}
