const Neuron = require('./Neuron');
const { Direction } = require('./enums');

class Network {
  /**
   * @param {Number[]} weights 
   */
  constructor(weights) {
    if (weights.length !== 40) {
      throw new Error('Network require weights list with size 40');
    }
    this.neurons = [
      new Neuron(weights.slice(0, 5)),
      new Neuron(weights.slice(5, 10)),
      new Neuron(weights.slice(10, 15)),
      new Neuron(weights.slice(15, 20)),
      new Neuron(weights.slice(20, 25)),
      new Neuron(weights.slice(25, 30)),
      new Neuron(weights.slice(30, 35)),
      new Neuron(weights.slice(35, 40)),
    ];
    this.firstLayer = this.neurons.slice(0, 4);
    this.secondLayer = this.neurons.slice(4, 8);
    this.secondLayerRepresentation = [
      Direction.Top,
      Direction.Bottom,
      Direction.Right,
      Direction.Left,
    ];
  }

  /**
   * @param {Number[]} inputs 
   */
  run(inputs) {
    if (inputs.length !== 4) {
      throw new Error('Failed to execute network, values should have 4 length');
    }

    const firstLayerResult = this.firstLayer
      .map(neuron => neuron.run(inputs));

    const secondLayerResult = this.secondLayer
      .map(neuron => neuron.run(firstLayerResult));

    let biggestIndex = 0;
    for (let i = 0; i < secondLayerResult.length; i++) {
      if (secondLayerResult[i] > secondLayerResult[biggestIndex]) {
        biggestIndex = i;
      }
    }

    return this.secondLayerRepresentation[biggestIndex];
  }
}

module.exports = Network;
