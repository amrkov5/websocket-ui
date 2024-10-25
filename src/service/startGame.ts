import { GamesDbType, UsersInGame } from '../db';

const startGame = (game: GamesDbType) => {
  const response = new Map();
  game.users.forEach((user: UsersInGame) => {
    const userData = JSON.stringify({
      ships: user.ships,
      currentPlayerIndex: user.idPlayer,
    });
    response.set(
      user.userIndex,
      JSON.stringify({ type: 'start_game', data: userData, id: 0 })
    );
  });
  return response;
};

export default startGame;
