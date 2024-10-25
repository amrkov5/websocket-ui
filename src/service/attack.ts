import { gamesDb } from '../db';
import { AttackData } from '../types';

const attack = (data: string) => {
  const parsedData: AttackData = JSON.parse(data);
  const game = gamesDb.find((el) => (el.gameId = parsedData.gameId));
  if (game) {
    const attackedUser = game.users.find(
      (user) => user.idPlayer !== parsedData.indexPlayer
    );
    if (attackedUser) {
      console.log(attackedUser);
    }
  }
};

export default attack;
