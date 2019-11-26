const path = require('path');
const fs = require('fs');
const Maze = require('./Maze');

const assetsPath = path.join(__dirname, '../assets');

const getAssetsFiles = () => new Promise((resolve, reject) => {
  fs.readdir(assetsPath, (err, files) => {
    if (err) {
      reject(err);
    } else {
      const filePaths = files.map(fileName => path.join(assetsPath, fileName));
      resolve(filePaths);
    }
  });
});

/**
 * @param {string} filePath
 * @return {Promise<Maze>}
 */
const loadMaze = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      reject(err);
    } else {
      const filename = filePath
        .replace(assetsPath, '')
        .replace('/', '')
        .split('.')
        .shift();
      const cells = data
        .toString()
        .split('\n')
        .map(row => row.split(' '));
      cells.shift();
      resolve(new Maze(filename, cells));
    }
  });
});

/**
 * @return {Promise<Maze[]}>
 */
module.exports = async () => {
  const files = await getAssetsFiles();
  return await Promise.all(files.map(loadMaze));
};
