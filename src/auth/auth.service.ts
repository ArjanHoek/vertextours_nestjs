import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthDTO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  login() {
    return { message: 'You are logged in' };
  }

  async signup({ email, password }: AuthDTO) {
    const hash = await argon.hash(password);
    const newUser = this.userRepository.create({ email, hash });

    try {
      return await this.userRepository.insert(newUser);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === '23505') {
          throw new ForbiddenException('Credentials already taken');
        }
      }

      throw error;
    }
  }
}
