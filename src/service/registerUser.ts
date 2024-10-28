import { userDb } from '../db';
import { UserData } from '../types';

const registerUser = (user: string, connectionId: string) => {
  const parsedUser: UserData = JSON.parse(user);
  const isUserRegistered = userDb.find(
    (addedUser) => addedUser.username === parsedUser.name
  );
  if (!isUserRegistered) {
    userDb.push({
      index: connectionId,
      username: parsedUser.name,
      password: parsedUser.password,
    });
    const stringifiedData = JSON.stringify({
      index: connectionId,
      name: parsedUser.name,
      error: false,
      errorText: '',
    });

    console.log({ type: 'reg', data: JSON.parse(stringifiedData), id: 0 });
    return { type: 'reg', data: stringifiedData, id: 0 };
  } else {
    const stringifiedData = JSON.stringify({
      index: connectionId,
      name: parsedUser.name,
      error: true,
      errorText: 'The user has already been registered',
    });
    console.log({ type: 'reg', data: stringifiedData, id: 0 });
    return { type: 'reg', data: stringifiedData, id: 0 };
  }
};

export default registerUser;
