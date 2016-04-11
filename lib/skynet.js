function Skynet(){}

Skynet.prototype.think = function(game) {

  findFruit(game);
  avoidWalls(game);
};

function findFruit(game) {
  var player = game.players[0];
  var fruit  = game.fruit;
  if (player.x - fruit.x > 0 && player.checkDirection() !== 'right') {
    player.faceLeft();
    console.log('left');
  } else if (player.x - fruit.x < 0 && player.checkDirection() !== 'left') {
    player.faceRight();
    console.log('right');
  } else if (player.y - fruit.y > 0 && player.checkDirection() !== 'down') {
    player.faceUp();
    console.log('up');
  } else if (player.y - fruit.y < 0 && player.checkDirection() !== 'up') {
    player.faceDown();
    console.log('down');
  }
}

function avoidWalls(game) {
  var player = game.players[0];

  switch (player.checkDirection()) {
    case 'right':
    if (player.x > game.grid.realWidth - (player.size * 2)) {
      if (player.y > game.grid.realHeight - player.y){
        player.faceUp();
      } else {
        player.faceDown();
      }
    } break;
    case 'left':
    if (player.x < player.size * 2) {
      if (player.y > game.grid.realHeight - player.y){
        player.faceUp();
      } else {
        player.faceDown();
      }
    } break;
    case 'up':
    if (player.y < player.size * 2) {
      if (player.x > game.grid.realWidth - player.x){
        player.faceLeft();
      } else {
        player.faceRight();
      }
    } break;
    case 'down':
    if (player.y > game.grid.realHeight - (player.size * 2)) {
      if (player.x > game.grid.realWidth - player.x){
        player.faceLeft();
      } else {
        player.faceRight();
      }
    } break;
  }

}

module.exports = Skynet;
