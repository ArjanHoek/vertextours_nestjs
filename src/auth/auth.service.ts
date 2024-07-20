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

  async login(dto: AuthDTO) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordCorrect = await argon.verify(user.hash, dto.password);

    if (!passwordCorrect) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const { id, email } = user;
    return { id, email };
  }

  async signup(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);
    const newUser = this.userRepository.create({ email: dto.email, hash });

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
