function Grid (size, width, height) {
  if (width % size !== 0 || height % size !== 0) {
    throw 'Grid does not fit in canvas';
  }

  this.size       = size;
  this.width      = width / size;
  this.height     = height / size;
  this.realWidth  = width;
  this.realHeight = height;
}

Grid.prototype.randomX = function () {
  return Math.floor(Math.random() * this.width) * this.size;
};

Grid.prototype.randomY = function () {
  return Math.floor(Math.random() * this.height) * this.size;
};

Grid.prototype.middleY = function () {
  return this.height / 2 * this.size;
};

Grid.prototype.P1X = function () {
  return Math.floor(this.width / 8) * this.size;
};

Grid.prototype.P2X = function () {
  return Math.floor(this.width / 8 * 7) * this.size;
};

module.exports = Grid;
