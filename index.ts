import { WebSocketServer } from 'ws';
import { httpServer } from './src/http_server';
import { registeredUser, ReqRequest } from './src/types';
import registerUser from './src/service/registerUser';
import updateRooms from './src/service/updateRooms';
import updateWinners from './src/service/updateWinners';
import createRoom from './src/service/createRoom';
import addToRoom from './src/service/addToRoom';
import createGame from './src/service/createGame';
import addShips from './src/service/addShips';
import startGame from './src/service/startGame';
import getTurn from './src/service/getTurn';
import attack from './src/service/attack';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const connectionList = new Map();
const server = new WebSocketServer({ port: 3000 });
console.log('WebSocket server has been started on port 3000');

server.on('connection', (ws) => {
  const connectionId = crypto.randomUUID();
  console.log(`Client with id ${connectionId} connected.`);
  connectionList.set(connectionId, ws);
  ws.on('message', (data) => {
    const parsedData: ReqRequest = JSON.parse(data.toString());
    switch (parsedData.type) {
      case 'reg':
        const registeredUser = registerUser(parsedData.data, connectionId);

        ws.send(JSON.stringify(registeredUser));

        connectionList.forEach((el) => {
          el.send(updateRooms());
          el.send(updateWinners());
        });
        break;
      case 'create_room':
        createRoom(connectionId);
        connectionList.forEach((el) => {
          el.send(updateRooms());
          el.send(updateWinners());
        });
        break;

      case 'add_user_to_room':
        const result = addToRoom(parsedData.data, connectionId);
        if (result && result.length === 2) {
          connectionList.forEach((el) => {
            el.send(updateRooms());
          });
          result.forEach((user) => {
            connectionList.get(user.index).send(updateWinners());
          });
          const game = createGame(result[0].index, result[1].index);
          game.users.forEach((user) => {
            const dataToString = JSON.stringify({
              idGame: game.gameId,
              idPlayer: user.idPlayer,
            });
            connectionList.get(user.userIndex).send(
              JSON.stringify({
                type: 'create_game',
                data: dataToString,
                id: 0,
              })
            );
          });
        }
        break;
      case 'add_ships':
        const shipResult = addShips(parsedData.data);
        if (shipResult?.users.filter((el) => el.ships).length === 2) {
          const startGameRes = startGame(shipResult);
          const turn = getTurn(shipResult);
          for (const [index, result] of startGameRes) {
            const currentConnection = connectionList.get(index);
            currentConnection.send(result);
            currentConnection.send(turn);
          }
        }
        break;
      case 'attack':
        attack(parsedData.data);
        break;
      case 'randomAttack':
        break;
    }
  });
  ws.on('close', () => {
    connectionList.delete(connectionId);
    console.log(`Connection with id ${connectionId} closed`);
  });
});

process.on('SIGINT', () => {
  console.log('Servers are shutting down');
  server.clients.forEach((connection) => {
    connection.close(1001);
  });
  httpServer.close();
  console.log('HTTP server has been shut down');
  console.log('WebSocket server has been shut down');
  process.exit(0);
});
