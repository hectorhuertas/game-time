function Player(options){
  this.game     = options.game;
  this.controls = options.controls;
  this.score    = 0;
  var p1X       = this.game.grid.P1X();
  var p2X       = this.game.grid.P2X();
  this.x        = options.x || (this.controls === 'wasd' ? p1X : p2X) || 50;
  this.y        = options.y || this.game.grid.middleY() || 50;
  this.speed    = this.game.grid.size;
  this.size     = this.speed;
  this.faceRight();
}

Player.prototype.checkDirection = function(){
  if (this.speedX > 0) { return "right"; }
  if (this.speedX < 0) { return "left"; }
  if (this.speedY > 0) { return "down"; }
  if (this.speedY < 0) { return "up"; }
};

Player.prototype.faceDirection = function(speedX, speedY){
  this.speedX = speedX;
  this.speedY = speedY;
};

Player.prototype.faceLeft  = function(){this.faceDirection(-Math.abs(this.speed), 0);};
Player.prototype.faceRight = function(){this.faceDirection( Math.abs(this.speed), 0);};
Player.prototype.faceUp    = function(){this.faceDirection(0, -Math.abs(this.speed));};
Player.prototype.faceDown  = function(){this.faceDirection(0,  Math.abs(this.speed));};

Player.prototype.died = function(){
  var wall = this.x < 0 || this.y < 0 ||
             this.x >= this.game.grid.realWidth || this.y >= this.game.grid.realHeight;
  var players = this.game.occupiedPositions[this.x] && this.game.occupiedPositions[this.x][this.y];

  var death = wall || players;

  if (death) { this.score -= 2500; }

  return death;
};

Player.prototype.scored = function(){
  var x = this.x === this.game.fruit.x;
  var y = this.y === this.game.fruit.y;

  var score = x && y;

  if (score) { this.score += 1000; }

  return score;
};

Player.prototype.move = function(){
  this.x += this.speedX;
  this.y += this.speedY;
};

Player.prototype.orient = function(){
  if (this.controls === 'arrows') {
    if (this.game.KeyPressed.left)  {this.faceLeft();}
    if (this.game.KeyPressed.right) {this.faceRight();}
    if (this.game.KeyPressed.up)    {this.faceUp();}
    if (this.game.KeyPressed.down)  {this.faceDown();}
  } else if (this.controls === 'wasd') {
    if (this.game.KeyPressed.a) {this.faceLeft();}
    if (this.game.KeyPressed.d) {this.faceRight();}
    if (this.game.KeyPressed.w) {this.faceUp();}
    if (this.game.KeyPressed.s) {this.faceDown();}
  }

  return this;
};

Player.prototype.position = function () {
  return [this.x, this.y];
};

module.exports = Player;
