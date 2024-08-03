import { Role } from 'src/modules/auth/enums';

interface IUser {
  email: string;
  password: string;
  role: Role;
  isConfirmed: boolean;
}

const users: IUser[] = [
  {
    email: 'user@test.com',
    password: 'password',
    role: Role.User,
    isConfirmed: true,
  },
  {
    email: 'admin@test.com',
    password: 'password',
    role: Role.Admin,
    isConfirmed: true,
  },
  {
    email: 'manager@test.com',
    password: 'password',
    role: Role.Manager,
    isConfirmed: true,
  },
];

export default users;
