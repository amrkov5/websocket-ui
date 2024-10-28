import { gamesDb } from '../db';
import attack from './attack';

const randomAttack = (data: string) => {
  const parsedData = JSON.parse(data);
  const game = gamesDb.find((games) => games.gameId === parsedData.gameId);
  if (game) {
    let randomX: number;
    let randomY: number;
    let userLog;
    let coordinates;
    do {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
      userLog = game.log.filter(
        (log) => log.playerId === parsedData.indexPlayer
      );
      console.log(userLog);
      coordinates = userLog.find(
        (log) => log.x === randomX && log.y === randomY
      );
    } while (coordinates);
    const attackResult = attack(
      JSON.stringify({
        gameId: game?.gameId,
        x: randomX,
        y: randomY,
        indexPlayer: parsedData.indexPlayer,
      })
    );
    return attackResult;
  }
};

export default randomAttack;
