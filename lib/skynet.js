function Skynet(options){

  // this.game  = options.game;
  // this.score = 0;
  // this.x     = options.x;
  // this.y     = options.y;
  // this.speed = this.game.grid.size;
  // this.size  = this.speed;
}

Skynet.prototype.think = function(game) {

  var player = game.players[0];

  switch (player.checkDirection()) {
    case 'right':
    if (player.x > 450) {
      if (player.y > game.grid.realHeight - player.y){
        player.faceUp();
      } else {
        player.faceDown();
      }
    } break;
    case 'left':
    if (player.x < 50) {
      if (player.y > game.grid.realHeight - player.y){
        player.faceUp();
      } else {
        player.faceDown();
      }
    } break;
    case 'up':
    if (player.y < 50) {
      if (player.x > game.grid.realWidth - player.x){
        player.faceLeft();
      } else {
        player.faceRight();
      }
    } break;
    case 'down':
    if (player.y > 450) {
      if (player.x > game.grid.realWidth - player.x){
        player.faceLeft();
      } else {
        player.faceRight();
      }
    } break;
  }

  // var bottom = game.grid.realHeight;
  // var right = game.grid.realWidth;
  //
  // shouldIMove(player)
  // check if needs to move
  //  if it does, decide which direction
  // if (player.x > 400) {
  //   player.faceUp();
  // }
  // if (player.y < 30) {
  //   player.faceLeft();
  // }
  // if (player.x < 30){
  //   player.faceDown();
  // }
  // if (player.y > 400){
  //   player.faceRight();
  // }

};

// function shouldIMove(game, player) {
//
// }

module.exports = Skynet;

//Create machine function
//give function attributes
//call update on machine from game.js
//create ai if statement
