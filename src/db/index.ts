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
  status: 'alive' | 'killed';
};

const userDb: UserDbType[] = [];

const winnersDb: winnersDbType[] = [];
const roomsDb: roomsDbType[] = [];

const gamesDb: GamesDbType[] = [];

const turnData = { playerId: '' };

export {
  userDb,
  roomsDb,
  winnersDb,
  gamesDb,
  Ships,
  UsersInGame,
  GamesDbType,
  turnData,
};
