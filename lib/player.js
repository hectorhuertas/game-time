function Player(options){
  this.game     = options.game;
  this.controls = options.controls;
  this.x        = options.x || 50;
  this.y        = options.y || 50;
  this.speed    = options.speed || 10;
  this.size     = this.speed;
  this.faceRight();
  this.score = 0;
}

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
             this.x >= (this.game.width)|| this.y >= (this.game.height);
  var players = this.game.occupiedPositions[this.x] && this.game.occupiedPositions[this.x][this.y];
  if (wall || players) {
    this.score -= 2500;
  }
  return 0 || players;
};

Player.prototype.scored = function(){
  var x = this.x === this.game.fruit.x;
  var y = this.y === this.game.fruit.y;
  if (x && y) { this.score += 1000; }
  return x && y;
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
