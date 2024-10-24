import { userDb } from '../db';
import { UserData } from '../types';

const registerUser = (user: string, connectionId: string) => {
  const parsedUser: UserData = JSON.parse(user);
  userDb.push({
    index: connectionId,
    username: parsedUser.name,
    password: parsedUser.password,
  });

  return { index: connectionId, name: parsedUser.name };
};

export default registerUser;
