const { Direction, CellType, Points } = require('./enums');

class Maze {
  /**
   * @param {string} id
   * @param {string[][]} cells 
   */
  constructor(id, cells) {
    this.id = id;
    this.cells = cells;
    this.initialPosition = this.getInitialPosition();
  }

  getInitialPosition() {
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells.length; x++) {
        if (this.isEntry({ x, y })) {
          return { x, y };
        }
      }
    }
  }

  getNextPosition({ x, y }, direction) {
    switch (direction) {
      case Direction.Top:
        return { x, y: y - 1 };
      case Direction.Right:
        return { x: x + 1, y };
      case Direction.Bottom:
        return { x, y: y + 1 };
      case Direction.Left:
        return { x: x - 1, y };
      default:
        throw new Error('Invalid direction');
    }
  }

  getNextCellTypes(pos) {
    return Object
      .values(Direction)
      .map(dir => this.getValue(this.getNextPosition(pos, dir)));
  }

  getValue({ x, y }) {
    if (!this.cells[y] || !this.cells[y][x]) {
      return CellType.Wall;
    }
    return this.cells[y][x];
  }

  checkCell(pos, value) {
    return this.getValue(pos) === value;
  }

  isCoin(pos) {
    return this.checkCell(pos, CellType.Coin);
  }

  isEntry(pos) {
    return this.checkCell(pos, CellType.Entry);
  }

  isEmpty(pos) {
    return this.checkCell(pos, CellType.Empty);
  }

  isWall(pos) {
    return this.checkCell(pos, CellType.Wall);
  }

  isExit(pos) {
    return this.checkCell(pos, CellType.Exit);
  }
}

module.exports = Maze;
