import { Role } from 'src/modules/auth/enums';

interface IUser {
  email: string;
  password: string;
  role: Role;
}

const users: IUser[] = [
  {
    email: 'user@test.com',
    password: 'password',
    role: Role.User,
  },
  {
    email: 'admin@test.com',
    password: 'password',
    role: Role.Admin,
  },
  {
    email: 'manager@test.com',
    password: 'password',
    role: Role.Manager,
  },
];

export default users;
