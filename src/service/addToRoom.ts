import { roomsDb, userDb } from '../db';
import { AddToRoomData } from '../types';

const addToRoom = (data: string, userId: string) => {
  const parsedData: AddToRoomData = JSON.parse(data);
  const userData = userDb.find((el) => el.index === userId);
  const room = roomsDb.find((el) => el.roomId === parsedData.indexRoom);
  if (room && userData) {
    room.roomUsers.push({
      name: userData.username,
      index: userData.index,
    });
    return room?.roomUsers;
  }
};

export default addToRoom;
