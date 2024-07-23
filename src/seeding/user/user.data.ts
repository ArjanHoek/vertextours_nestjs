interface IUser {
  email: string;
  password: string;
}

const users: IUser[] = [
  {
    email: 'arjanhoek@test.com',
    password: 'password',
  },
  {
    email: 'johndoe@test.com',
    password: 'password',
  },
];

export default users;
