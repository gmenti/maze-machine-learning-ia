
const defaultConfig = {
  learnRate: 0.15,
  interaction: 1000,  
};

class Perceptron {

  constructor(config = defaultConfig) {
    this.bias = 1;
    this.weights = [];
    this.learnRate = config.learnRate;
    this.interaction = config.interaction;
  }

  initWeights(num) {
    this.bias = parseInt(Math.random() * 10);
    for (let i = 0; i < num; i++) {
      this.weights[i] = parseInt(Math.random() * 10);
    }
  }

  sigmoid(u) {
    // can be: return 1 / (1 - sumOfMultiple(u * -1)); 
    return 1 / (1 + Math.exp(u * -1));
  }

  train(data) {
    this.initWeights(data[0].inputs.length);
    let interaction = 0;
    let error = true;
    while (error && interaction < this.interaction) {
      error = false;
      let difference = 0;
      for (let i = 0; i < data.length; i++) {
        const result = this.run(data[i].inputs);
        if (result != data[i].output) {
          error = true;
          difference = data[i].output - result;
          this.recalcWeights(difference, data[i].inputs);
        } else {
          error = false;
        }
      }
      console.log(`Interaction: ${interaction} - Error: ${difference.toFixed(12)} ${error}`);
      interaction++;
    }
  }

  recalcWeights(val, inputs) {
    for (let j = 0; j < this.weights.length; j++) {
      this.weights[j] = this.weights[j] + this.learnRate * val * inputs[j];
    }
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

module.exports = Perceptron;
