import { WebSocketServer } from 'ws';
import { registeredUser, ReqRequest } from '../types';
import registerUser from '../service/registerUser';
import updateRooms from '../service/updateRooms';
import updateWinners from '../service/updateWinners';

const createWss = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      const parsedData: ReqRequest = JSON.parse(data.toString());
      switch (parsedData.type) {
        case 'reg':
          try {
            const registeredUser: registeredUser = registerUser(
              parsedData.data
            );
            if (registeredUser) {
              registeredUser.error = false;
              registeredUser.errorText = '';

              const response = {
                ...parsedData,
                data: JSON.stringify(registeredUser),
              };
              ws.send(JSON.stringify(response));
              ws.send(updateRooms());
              ws.send(updateWinners());
            }
          } catch {}
          break;

        default:
          break;
      }
    });
  });
  console.log('WS server is started on port 3000!');
};

export default createWss;
