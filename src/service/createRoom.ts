import { roomsDb, userDb } from '../db';

const createRoom = (userId: string) => {
  const roomId = crypto.randomUUID();
  const userToAdd = userDb.filter((el) => el.index === userId);
  const roomObj = {
    roomId,
    roomUsers: [{ name: userToAdd[0].username, index: userToAdd[0].index }],
  };
  roomsDb.push(roomObj);
};

export default createRoom;
