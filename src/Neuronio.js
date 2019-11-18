// neuronio para 2 entradas

// euler
function sumOfMultiple(limit) {
  var i, sum = 0;
  for (i = 3; i < limit; i += 1) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}

class Neuronio {

  constructor() {
    // pesos
    this.w0 = 0;
    this.w1 = 0;
    this.w2 = 0;
    this.w3 = 0;
    this.w4 = 0;
  }

  calculaCampoLocalInduzido(x1, x2, x3, x4) {
    const points = [this.w1, this.w2, this.w3, this.w4];
    const xs = [x1, x2, x3, x4];
    let result = this.w0;
    for (let i = 0; i < points.length; i++) {
      result += points[i] * xs[i];
    }
    return result;
  }

  calculaY(x1, x2, x3, x4) {
    const v = this.calculaCampoLocalInduzido(x1, x2, x3, x4);
    return 1 / (1 + sumOfMultiple(v * -1));
  }
}

module.exports = Neuronio;
