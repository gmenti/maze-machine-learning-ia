const { randomNumber, randomCR, castCellTypeToPoint, castCellTypeToWeight } = require('./helpers');
const Network = require('./Network');

class Genetic {
  /**
   * 
   * @param {import('./Maze')} maze 
   */
  constructor(maze) {
    this.initialPopulationSize = 1000;
    this.cromossomeSize = 40;
    this.population = this.makeInitialPopulation();
    this.mutationsLimit = parseInt(this.cromossomeSize / 15);
    this.maze = maze;
  }

  getMutationAmount() {
    return randomNumber(this.mutationsLimit) || 1;
  }

  makeCromossome() {
    const cromossome = [];
    while (cromossome.length < this.cromossomeSize) {
      cromossome.push(randomCR());
    }
    return cromossome;
  }

  makeInitialPopulation() {
    const population = [];
    while (population.length < this.initialPopulationSize) {
      population.push(this.makeCromossome());
    }
    return population;
  }

  getRandomCromossome() {
    return this.population[randomNumber(this.population.length - 1)];
  }

  getValuation(cromossome) {
    const network = new Network(cromossome);
    const walkedPositions = [];

    let valuation = 0;
    let actualPosition = this.maze.initialPosition;
    while (!this.maze.isWall(actualPosition)) {
      const nextCellTypes = this.maze.getNextCellTypes(actualPosition);
      const inputs = nextCellTypes.map(castCellTypeToWeight);
      const dir = network.run(inputs);
      actualPosition = this.maze.getNextPosition(actualPosition, dir);

      const alreadyWalked = !!walkedPositions
        .find(pos => pos.x === actualPosition.x && pos.y === actualPosition.y);

      if (alreadyWalked) {
        break;
      }

      walkedPositions.push(actualPosition);

      const cellType = this.maze.getValue(actualPosition);
      const points = castCellTypeToPoint(cellType);
      valuation += points;
    }

    return valuation;
  }

  getMovements(cromossome) {
    const network = new Network(cromossome);
    const walkedPositions = [];

    let actualPosition = this.maze.initialPosition;
    while (!this.maze.isWall(actualPosition)) {
      const nextCellTypes = this.maze.getNextCellTypes(actualPosition);
      const inputs = nextCellTypes.map(castCellTypeToWeight);
      const dir = network.run(inputs);
      actualPosition = this.maze.getNextPosition(actualPosition, dir);

      const alreadyWalked = !!walkedPositions
        .find(pos => pos.x === actualPosition.x && pos.y === actualPosition.y);

      if (alreadyWalked) {
        break;
      }

      walkedPositions.push(actualPosition);
    }

    return walkedPositions;
  }


  tournament() {
    const first = this.getRandomCromossome();
    const second = this.getRandomCromossome();
    if (first === second) {
      return this.tournament();
    }
    if (this.getValuation(first) < this.getValuation(second)) {
      return first;
    }
    return second;
  }

  recyclePopulation() {
    this.population.sort((a, b) => this.getValuation(a) > this.getValuation(b) ? -1 : 1);
    this.population = this.population.slice(0, this.initialPopulationSize);
  }

  createChild() {
    const father = this.tournament();
    const mother = this.tournament();
    if (father === mother) {
      return this.createChild();
    }

    const child = [];
    while (child.length < this.cromossomeSize) {
      const sumMean = (father[child.length] + mother[child.length]) / 2;
      child.push(sumMean);
    }

    const mutationsAmount = this.getMutationAmount();
    for (let i = 0; i < mutationsAmount; i++) {
      const index = randomNumber(this.cromossomeSize - 1);
      child[index] = randomCR();
    }

    return child;
  }

  newGeneration() {
    const population = [];
    while (population.length < this.initialPopulationSize) {
      population.push(this.createChild());
    }
    this.population = population;
  }
}

module.exports = Genetic;
