const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const loader = require('./loader');
const Genetic = require('./Genetic');
const { sleep } = require('./helpers');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', async (socket) => {
  const mazes = await loader();
  socket.emit('maze', mazes[0]);

  socket.on('start', async () => {
    for (const maze of mazes) {
      const genetic = new Genetic(maze);
      
      let best = 0;
      let bests = {};
      let lastLogAt = Date.now();
      let generation = 0;
      while (true) {
        const child = genetic.createChild();
        const valuation = genetic.getValuation(child);
        if (valuation <= 0) {
          continue;
        }
        generation++;
        genetic.population.push(child);
        bests[valuation] = bests[valuation] || 0;
        bests[valuation] += 1;
        if (valuation > best) {
          best = valuation;
          socket.emit('best', genetic.getMovements(child));
          if (best === 167) {
            // break;
          }
        }
        if (false && genetic.population.length > genetic.initialPopulationSize * 50) {
          genetic.recyclePopulation();
          bests = {};
          genetic.population.forEach((cromossome) => {
            const value = genetic.getValuation(cromossome);
            bests[value] = bests[value] || 0;
            bests[value] += 1;
          });
        }
        if (Date.now() > lastLogAt + 1000) {
          // // await sleep(1);
          lastLogAt = Date.now();
          console.log(bests, generation);
          await sleep(1);
        }
      }
    }
  });
});

server.listen(1337, () => {
  console.log('Server started on port http://localhost:1337');
});
