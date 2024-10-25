import { gamesDb } from '../db';

const createGame = (user1: string, user2: string) => {
  const gameId = crypto.randomUUID();
  const player1Id = crypto.randomUUID();
  const player2Id = crypto.randomUUID();
  const game = {
    gameId,
    users: [
      { userIndex: user1, idPlayer: player1Id },
      { userIndex: user2, idPlayer: player2Id },
    ],
  };

  gamesDb.push(game);
  return game;
};

export default createGame;
