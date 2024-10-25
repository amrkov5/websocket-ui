import { gamesDb } from '../db';
import { ShipsData } from '../types';

const addShips = (shipsData: string) => {
  const parsedData: ShipsData = JSON.parse(shipsData);
  const game = gamesDb.find((el) => el.gameId === parsedData.gameId);
  if (game) {
    const user = game.users.find(
      (el) => el.idPlayer === parsedData.indexPlayer
    );
    if (user) {
      user.ships = parsedData.ships;
    }
  }
  return game;
};

export default addShips;
