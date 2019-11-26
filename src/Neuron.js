class Neuron {

  constructor([w0, w1, w2, w3, w4]) {
    this.bias = w0;
    this.weights = [w1, w2, w3, w4];
  }

  sigmoid(u) {
    // can be: return 1 / (1 - sumOfMultiple(u * -1)); 
    return 1 / (1 + Math.exp(u * -1));
  }

  run(inputs) {
    let sum = 0;
    for (let j = 0; j < inputs.length; j++) {
      sum += inputs[j] * this.weights[j];
    }
    sum += this.bias;
    return this.sigmoid(sum);
  }
}

module.exports = Neuron;
