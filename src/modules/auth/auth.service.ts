import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
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
    try {
      const user = await this.userService.findOneByEmail(email, true);

      const passwordCorrect = await argon.verify(user.hash, password);

      if (!passwordCorrect) {
        throw new UnauthorizedException('Incorrect credentials');
      }

      return { access_token: await this.signToken(user) };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Incorrect credentials');
      }
    }
  }

  async signUp({ email, password }: AuthDTO) {
    const hash = await argon.hash(password);
    const user = await this.userService.createOne({ email, hash });
    return { access_token: await this.signToken(user) };
  }

  private signToken(user: User) {
    return this.jwtService.signAsync({ sub: user.id, email: user.email });
  }

  public validateToken(token: string) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.verifyAsync<JwtPayload>(token, { secret });
  }
}
