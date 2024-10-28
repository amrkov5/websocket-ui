import { roomsDb } from '../db';

const updateRooms = () => {
  const activeRooms = roomsDb.filter((el) => el.roomUsers.length === 1);
  const roomsResp = {
    type: 'update_room',
    data: JSON.stringify(activeRooms),
    id: 0,
  };
  console.log(roomsResp);
  return JSON.stringify(roomsResp);
};

export default updateRooms;
