function Player(game, options){
  this.game   = game;
  this.x      = options.x || 50;
  this.y      = options.y || 50;
  this.width  = options.width || 10;
  this.height = options.height || 10;
  this.speed  = options.speed || 3;
  this.speedX = this.speed;
  this.speedY = 0;

  this.faceLeft  = this.faceDirection.bind(this, -Math.abs(this.speed), 0);
  this.faceRight = this.faceDirection.bind(this,  Math.abs(this.speed), 0);
  this.faceUp    = this.faceDirection.bind(this, 0, -(Math.abs(this.speed)));
  this.faceDown  = this.faceDirection.bind(this, 0,  (Math.abs(this.speed)));
}

Player.prototype.died = function(){
  return this.game.occupiedPositions[this.x] && this.game.occupiedPositions[this.x][this.y];
};

Player.prototype.move = function(){
  this.x += this.speedX;
  this.y += this.speedY;

  return this;
};

Player.prototype.orient = function(){
  if (this.game.KeyPressed.left)  {this.faceLeft();}
  if (this.game.KeyPressed.right) {this.faceRight();}
  if (this.game.KeyPressed.up)    {this.faceUp();}
  if (this.game.KeyPressed.down)  {this.faceDown();}

  return this;
};

Player.prototype.position = function () {
  return [this.x, this.y];
};

Player.prototype.faceDirection = function(speedX, speedY){
  this.speedX = speedX;
  this.speedY = speedY;
};

module.exports = Player;
