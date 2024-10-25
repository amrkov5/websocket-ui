import { gamesDb } from '../db';
import { ShipsData } from '../types';
import calculateShips from './calculateShips';

const addShips = (shipsData: string) => {
  const parsedData: ShipsData = JSON.parse(shipsData);
  const game = gamesDb.find((el) => el.gameId === parsedData.gameId);
  if (game) {
    const user = game.users.find(
      (el) => el.idPlayer === parsedData.indexPlayer
    );
    if (user) {
      const upgradedShips = parsedData.ships.map((ship) => {
        return { ...ship, calculatedEnd: calculateShips(ship), shoots: 0 };
      });
      user.ships = upgradedShips;
    }
  }
  console.log(game?.users[0].ships);
  return game;
};

export default addShips;
