const Neuronio = require('./Neuronio');

class Perceptron {
  constructor() {
    this.neuronio = new Neuronio();
    // conjunto de treino OR
    this.x1 = [0, 0, 1, 1]; // primeira entrada
    this.x2 = [0, 1, 0, 1]; // segunda entrada
    this.d = [0, 1, 1, 1]; // saida desejada
  }
}

module.exports = Perceptron;
