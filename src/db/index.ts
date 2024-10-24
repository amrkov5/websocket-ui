const userDb = [];
const winnersDb = [
  {
    name: 'user1',
    wins: 1500,
  },
  {
    name: 'user2',
    wins: 3,
  },
];
const roomsDb = [
  {
    roomId: 1,
    roomUsers: [
      {
        name: 'user1',
        index: 100,
      },
    ],
  },
  {
    roomId: 1,
    roomUsers: [
      {
        name: 'user2',
        index: 100,
      },
    ],
  },
  {
    roomId: 2,
    roomUsers: [
      {
        name: 'user1',
        index: 100,
      },
      {
        name: 'user1',
        index: 100,
      },
    ],
  },
];

export { userDb, roomsDb, winnersDb };
