import { GamesDbType } from '../db';

const getTurn = (game: GamesDbType, player?: string) => {
  if (!player) {
    const randomPlayer = Math.floor(Math.random() * 2);
    const returnedData = JSON.stringify({
      currentPlayer: game.users[randomPlayer].idPlayer,
    });
    return JSON.stringify({ type: 'turn', data: returnedData, id: 0 });
  }
};

export default getTurn;
