import { userDb } from '../db';
import { UserData } from '../types';

const registerUser = (user: string) => {
  const parsedUser: UserData = JSON.parse(user);
  const userIndex = crypto.randomUUID();
  userDb.push({
    index: userIndex,
    username: parsedUser.name,
    password: parsedUser.password,
  });

  return { index: userIndex, name: parsedUser.name };
};

export default registerUser;
