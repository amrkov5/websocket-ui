import { gamesDb } from '../db';

const createGame = (user1: string, user2: string) => {
  const gameId = crypto.randomUUID();
  const game = {
    gameId,
    users: [{ userIndex: user1 }, { userIndex: user2 }],
  };

  gamesDb.push(game);
  return game;
};

export default createGame;
