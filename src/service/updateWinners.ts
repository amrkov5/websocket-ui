import { winnersDb } from '../db';

const updateWinners = () => {
  const winnersResp = {
    type: 'update_winners',
    data: JSON.stringify(winnersDb),
    id: 0,
  };
  console.log(winnersResp);
  return JSON.stringify(winnersResp);
};

export default updateWinners;
