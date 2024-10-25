type UserDbType = {
  index: string;
  username: string;
  password: string;
};

type winnersDbType = {
  name: string;
  wins: number;
};

type roomsDbType = {
  roomId: string;
  roomUsers: {
    name: string;
    index: string;
  }[];
};

type GamesDbType = {
  gameId: string;
  users: UsersInGame[];
};

type UsersInGame = {
  userIndex: string;
  idPlayer: string;
  ships?: Ships[];
};

type Ships = {
  position: {
    x: number;
    y: number;
  };
  calculatedEnd?: {
    x: number;
    y: number;
  };
  shoots: number;
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

const userDb: UserDbType[] = [];

const winnersDb: winnersDbType[] = [
  {
    name: 'user1',
    wins: 1500,
  },
  {
    name: 'user2',
    wins: 3,
  },
];
const roomsDb: roomsDbType[] = [];

const gamesDb: GamesDbType[] = [];

export { userDb, roomsDb, winnersDb, gamesDb, Ships, UsersInGame, GamesDbType };
