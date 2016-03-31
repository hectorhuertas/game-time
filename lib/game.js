const Player = require("./player");
const isColliding = require("./isColliding");
const KeyPressed = require("./keyPressed");

var Game = function(){
  this.KeyPressed = KeyPressed;
  this.occupiedPositions = [];
  this.players = [];
  // this.players.push(new Player(this, {}));
  // this.players.push(new Player(this, {x: 100, y:100}));
  this.firstPlayer = new Player(this, {});
  this.secondPlayer = new Player(this, {x: 100, y:100});
};

Game.prototype.logPosition = function(position){
  this.occupiedPositions[position[0]] = this.occupiedPositions[position[0]] || [];
  this.occupiedPositions[position[0]][position[1]] = true;
};

Game.prototype.update = function () {
  this.firstPlayer.orient();
  this.firstPlayer.move();
  this.secondPlayer.move();
  if (isColliding(this.firstPlayer, this.occupiedPositions)) {
    console.log('collision!!! at '+this.firstPlayer.position().toString());
  }
   this.logPosition(this.firstPlayer.position());
};

module.exports = Game;
