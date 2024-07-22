import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { UserService } from 'src/user/user.service';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn({ email, password }: AuthDTO) {
    const user = await this.userService.findOne({ email }, { hash: true });

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordCorrect = await argon.verify(user.hash, password);

    if (!passwordCorrect) {
      throw new UnauthorizedException();
    }

    return this.signToken(user);
  }

  async signUp({ email, password }: AuthDTO) {
    const hash = await argon.hash(password);

    try {
      const user = await this.userService.createOne({ email, hash });
      return this.signToken(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === '23505') {
          throw new ForbiddenException('Credentials already taken');
        }
      }

      throw error;
    }
  }

  private signToken(user: User) {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  public validateToken(token: string) {
    const secret = this.configService.get('JWT_SECRET');
    const options: JwtVerifyOptions = { secret };
    return this.jwtService.verifyAsync(token, options);
  }
}
