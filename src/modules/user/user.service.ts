import { FindOptionsWhere, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createOne({ email, hash }: Partial<User>) {
    const newUser = this.userRepository.create({ email, hash });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }

      throw error;
    }
  }

  public findOneById(id: string) {
    // NotFoundException will be thrown in private findOne() method
    return this.findOne({ id });
  }

  public findOneByEmail(email: string, withHash = false) {
    // NotFoundException will be thrown in private findOne() method
    return this.findOne({ email }, withHash);
  }

  private async findOne(where: FindOptionsWhere<User>, includeHash = false) {
    const user = await this.userRepository.findOne({
      where,
      select: { id: true, email: true, hash: includeHash },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async deleteOne(id: string) {
    const { affected } = await this.userRepository.delete(id);

    if (!affected) {
      throw new NotFoundException('User not found');
    }
  }
}
