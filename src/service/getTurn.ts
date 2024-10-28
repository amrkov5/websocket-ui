import { GamesDbType, turnData } from '../db';

const getTurn = (game: GamesDbType, player?: string) => {
  if (!player) {
    const randomPlayer = Math.floor(Math.random() * 2);
    const returnedData = JSON.stringify({
      currentPlayer: game.users[randomPlayer].idPlayer,
    });
    turnData.playerId = game.users[randomPlayer].idPlayer;
    return JSON.stringify({ type: 'turn', data: returnedData, id: 0 });
  } else {
    const playerId = game.users.find((el) => el.idPlayer !== player);
    const returnedData = JSON.stringify({
      currentPlayer: playerId!.idPlayer,
    });
    turnData.playerId = playerId!.idPlayer;

    return JSON.stringify({ type: 'turn', data: returnedData, id: 0 });
  }
};

export default getTurn;
