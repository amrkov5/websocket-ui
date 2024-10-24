import { WebSocketServer } from 'ws';
import { registeredUser, ReqRequest } from '../types';
import registerUser from '../service/registerUser';
import updateRooms from '../service/updateRooms';
import updateWinners from '../service/updateWinners';
import createRoom from '../service/createRoom';
import addToRoom from '../service/addToRoom';
import createGame from '../service/createGame';

const connectionList = new Map();

const createWss = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on('connection', (ws) => {
    const connectionId = crypto.randomUUID();
    connectionList.set(connectionId, ws);
    ws.on('message', (data) => {
      const parsedData: ReqRequest = JSON.parse(data.toString());
      switch (parsedData.type) {
        case 'reg':
          const registeredUser: registeredUser = registerUser(
            parsedData.data,
            connectionId
          );
          if (registeredUser) {
            registeredUser.error = false;
            registeredUser.errorText = '';

            const response = {
              ...parsedData,
              data: JSON.stringify(registeredUser),
            };
            ws.send(JSON.stringify(response));

            connectionList.forEach((el) => {
              el.send(updateRooms());
              el.send(updateWinners());
            });
          }
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
              connectionList.get(user.index).send();
            });
            const game = createGame(result[0].index, result[1].index);
            game.users.forEach((user) => {
              const dataToString = JSON.stringify({
                idGame: game.gameId,
                idPlayer: user.userIndex,
              });
              connectionList
                .get(user.userIndex)
                .send(
                  JSON.stringify({
                    type: 'create_game',
                    data: dataToString,
                    id: 0,
                  })
                );
            });
          }
          break;

        default:
          break;
      }
    });
  });
  wss.on('close', () => {});
  console.log('WS server is started on port 3000!');

  process.on('SIGINT', () => {
    console.log('WebSocket is off!');
    wss.close();
  });
};

export default createWss;
