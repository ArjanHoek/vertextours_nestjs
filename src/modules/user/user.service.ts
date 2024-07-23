import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(
    where: FindOptionsWhere<User>,
    addSelect: FindOptionsSelect<User> = {},
  ) {
    return this.userRepository.findOne({
      where,
      select: {
        id: true,
        email: true,
        created_at: true,
        refuges: true,
        ...addSelect,
      },
    });
  }

  createOne({ email, hash }: Partial<User>) {
    const newUser = this.userRepository.create({ email, hash });
    return this.userRepository.save(newUser);
  }
}
