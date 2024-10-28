import { GamesDbType, userDb, UsersInGame, winnersDb } from '../db';

const isGameFinished = (game: GamesDbType) => {
  let winner: UsersInGame | undefined;
  game.users.forEach((user) => {
    const areShipsAlive = user.ships?.filter((ship) => ship.status === 'alive');
    if (areShipsAlive?.length === 0) {
      winner = game.users.find((el) => el.idPlayer !== user.idPlayer);
    }
  });
  if (winner) {
    const foundUsername = userDb.find(
      (user) => user.index === winner?.userIndex
    );
    const foundUser = winnersDb.find(
      (name) => name.name === foundUsername?.username
    );
    if (!foundUser) {
      winnersDb.push({ name: foundUsername!.username, wins: 1 });
    } else {
      foundUser.wins += 1;
    }

    return {
      type: 'finish',
      data: JSON.stringify({ winPlayer: winner.idPlayer }),
      id: 0,
    };
  }
};

export default isGameFinished;
