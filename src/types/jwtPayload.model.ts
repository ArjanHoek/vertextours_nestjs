import { Role } from 'src/modules/auth/enums';

export type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
};
