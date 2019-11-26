const { CellType, Points, Weight } = require('./enums');

const randomNumber = (max) =>
  Math.floor(Math.random() * (max + 1));

const randomCR = () => {
  const number = Math.random();
  const isNegative = Math.random() >= 0.50;
  if (isNegative) {
    return number * -1;
  }
  return number;
};

const castCellTypeToWeight = (cellType) => {
  switch (cellType) {
    case CellType.Coin:
      return Weight.Coin;
    case CellType.Empty:
      return Weight.Empty;
    case CellType.Exit:
      return Weight.Exit;
    case CellType.Wall:
      return Weight.Wall;
    case CellType.Entry:
      return Weight.Entry;
    default:
      throw new Error('Invalid cell type');
  }
};

const castCellTypeToPoint = (cellType) => {
  switch (cellType) {
    case CellType.Coin:
      return Points.Coin;
    case CellType.Empty:
      return Points.Empty;
    case CellType.Exit:
      return Points.Exit;
    case CellType.Wall:
      return Points.Wall;
    case CellType.Entry:
      return Points.Entry;
    default:
      throw new Error('Invalid cell type');
  }
};

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

module.exports = {
  randomNumber,
  randomCR,
  castCellTypeToPoint,
  castCellTypeToWeight,
  sleep,
};
