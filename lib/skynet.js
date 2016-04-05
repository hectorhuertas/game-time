function Skynet(options){

  // this.game  = options.game;
  // this.score = 0;
  // this.x     = options.x;
  // this.y     = options.y;
  // this.speed = this.game.grid.size;
  // this.size  = this.speed;
}

Skynet.prototype.release = function(player) {
  if (player.y < 30) {
    player.faceLeft();

  } else {
    player.faceUp();
  }

};

module.exports = Skynet;

//Create machine function
//give function attributes
//call update on machine from game.js
//create ai if statement
