const Direction = {
  Top: 'TOP',
  Right: 'RIGHT',
  Bottom: 'BOTTOM',
  Left: 'LEFT',
};

const CellType = {
  Coin: 'M',
  Entry: 'E',
  Empty: '0',
  Wall: '1',
  Exit: 'S',
};

const Points = {
  Coin: 5,
  Entry: 0,
  Empty: 1,
  Wall: 0,
  Exit: 1000,
};

const Weight = {
  Coin: 1,
  Entry: 2,
  Empty: 3,
  Wall: 4,
  Exit: 5,
};

module.exports = {
  Direction,
  CellType,
  Points,
  Weight,
};
