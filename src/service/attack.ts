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
      let attackResult: string;
      const response = [];
      const missArr = [];
      const attackedUserShips = attackedUser.ships;
      const ship = attackedUserShips?.find(
        (el) =>
          parsedData.x >= el.position.x &&
          parsedData.x <= el.calculatedEnd!.x &&
          parsedData.y >= el.position.y &&
          parsedData.y <= el.calculatedEnd!.y
      );

      let status: string = 'miss';
      if (ship) {
        ship.shoots += 1;
        if (ship.shoots >= ship.length) {
          status = 'killed';
        } else {
          status = 'shot';
        }

        if (status === 'killed') {
          ship.status = 'killed';
          if (ship.direction) {
            for (let i = -1; i <= ship.length; i += 1) {
              if (ship.position.x < 9) {
                const missRight = {
                  x: ship.position.x + 1,
                  y: ship.position.y + i,
                };
                missArr.push(missRight);
              }
              if (ship.position.x > 0) {
                const missLeft = {
                  x: ship.position.x - 1,
                  y: ship.position.y + i,
                };
                missArr.push(missLeft);
              }
            }
            if (ship.position.y > 0) {
              const missTop = {
                x: ship.position.x,
                y: ship.position.y - 1,
              };
              missArr.push(missTop);
            }
            if (ship.calculatedEnd!.y < 9) {
              const missBot = {
                x: ship.calculatedEnd!.x,
                y: ship.calculatedEnd!.y + 1,
              };
              missArr.push(missBot);
            }
          } else {
            for (let i = -1; i <= ship.length; i += 1) {
              if (ship.position.y > 0) {
                const missTop = {
                  x: ship.position.x + i,
                  y: ship.position.y - 1,
                };
                missArr.push(missTop);
              }
              if (ship.position.y < 9) {
                const missBot = {
                  x: ship.position.x + i,
                  y: ship.position.y + 1,
                };
                missArr.push(missBot);
              }
            }
            if (ship.position.x > 0) {
              const missLeft = {
                x: ship.position.x - 1,
                y: ship.position.y,
              };
              missArr.push(missLeft);
            }
            if (ship.calculatedEnd!.x < 9) {
              const missRight = {
                x: ship.calculatedEnd!.x + 1,
                y: ship.calculatedEnd!.y,
              };
              missArr.push(missRight);
            }
          }
        }
        missArr.forEach((el) => {
          const res = {
            position: el,
            currentPlayer: parsedData.indexPlayer,
            status: 'miss',
          };

          response.push({ type: 'attack', data: JSON.stringify(res), id: 0 });
        });
      }
      attackResult = JSON.stringify({
        position: { x: parsedData.x, y: parsedData.y },
        currentPlayer: parsedData.indexPlayer,
        status,
      });
      response.push({ type: 'attack', data: attackResult, id: 0 });
      return { status, data: response };
    }
  }
};

export default attack;
