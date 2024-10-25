import { Ships } from '../db';

//true - vertical: false - horizontal

const calculateShips = (ship: Ships) => {
  if (ship.direction) {
    const calculatedEnd = {
      x: ship.position.x,
      y: ship.position.y + ship.length,
    };
    return calculatedEnd;
  } else {
    const calculatedEnd = {
      x: ship.position.x + ship.length,
      y: ship.position.y,
    };
    return calculatedEnd;
  }
};

export default calculateShips;
