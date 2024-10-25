import { Ships } from '../db';

//true - vertical: false - horizontal

const calculateShips = (ship: Ships) => {
  if (ship.direction) {
    const calculatedEnd = {
      x: ship.position.x,
      y: ship.position.y + ship.length - 1,
    };
    return calculatedEnd;
  } else {
    const calculatedEnd = {
      x: ship.position.x + ship.length - 1,
      y: ship.position.y,
    };
    return calculatedEnd;
  }
};

export default calculateShips;
