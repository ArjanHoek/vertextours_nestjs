import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn({ email, password }: AuthDTO) {
    const user = await this.userService.findOne({ email }, { hash: true });

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordCorrect = await argon.verify(user.hash, password);

    if (!passwordCorrect) {
      throw new UnauthorizedException();
    }

    delete user.hash;
    return user;
  }

  async signUp({ email, password }: AuthDTO) {
    const hash = await argon.hash(password);

    try {
      const user = await this.userService.createOne({ email, hash });
      const mappedUser = ['id', 'email', 'created_at', 'updated_at'].reduce(
        (acc, cur) => ({ ...acc, [cur]: user[cur] }),
        {},
      );
      return mappedUser;
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
