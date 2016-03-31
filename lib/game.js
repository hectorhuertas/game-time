const Player = require("./player");
const isColliding = require("./isColliding");

var Game = function(){
  this.firstPlayer = new Player({});
  this.occupiedPositions = [];
};

Game.prototype.logPosition = function(player){
  this.occupiedPositions[player.x] = this.occupiedPositions[player.x] || [];
  this.occupiedPositions[player.x][player.y] = true;
};

Game.prototype.update = function () {
  this.firstPlayer.orient();
  this.firstPlayer.move();
  if (isColliding(this.firstPlayer, this.occupiedPositions)) {
    console.log('collision!!! at ' + this.firstPlayer.position().toString());
  } else {
    this.logPosition(this.firstPlayer);
  }
};

module.exports = Game;
