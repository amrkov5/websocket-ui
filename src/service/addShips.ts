import { gamesDb, Ships } from '../db';
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
      const upgradedShips: Ships[] = parsedData.ships.map((ship) => {
        return {
          ...ship,
          calculatedEnd: calculateShips(ship),
          shoots: 0,
          status: 'alive',
        };
      });
      user.ships = upgradedShips;
    }
  }
  return game;
};

export default addShips;
