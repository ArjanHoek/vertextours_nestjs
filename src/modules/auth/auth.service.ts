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
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async login({ email, password }: AuthDTO) {
    try {
      const user = await this.userService.findOneByEmail(email, true);

      if (!user.isConfirmed) {
        throw new UnauthorizedException('User not confirmed');
      }

      const passwordCorrect = await argon.verify(user.hash, password);

      if (!passwordCorrect) {
        throw new UnauthorizedException('Incorrect credentials');
      }

      return { access_token: await this.signToken(user) };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Incorrect credentials');
      }

      throw err;
    }
  }

  public async register({ email, password }: AuthDTO) {
    const hash = await argon.hash(password);
    return this.userService.createOne({ email, hash });
  }

  async confirmRegistration(token: string) {
    const { sub } = await this.validateMailConfirmationToken(token);
    return this.userService.setUserConfirmed(sub);
  }

  async sendVerificationLink({ id, email }: User) {
    const token = await this.jwtService.signAsync(
      { sub: id, email },
      {
        secret: this.configService.get('JWT_VERIFICATION_SECRET'),
        expiresIn: this.configService.get('JWT_VERIFICATION_EXPIRE'),
      },
    );

    this.mailService.sendConfirmationMail(email, token);
  }

  private signToken({ email, role, id }: User) {
    return this.jwtService.signAsync({ sub: id, email, role });
  }

  private validateMailConfirmationToken(token: string) {
    const secret = this.configService.get('JWT_VERIFICATION_SECRET');
    return this.jwtService.verifyAsync<JwtPayload>(token, { secret });
  }

  public validateToken(token: string) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.verifyAsync<JwtPayload>(token, { secret });
  }
}
