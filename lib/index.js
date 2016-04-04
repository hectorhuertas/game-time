const KeyListener = require("./keyListener");
const Game        = require("./game");
const Render      = require("./render");

const canvas  = document.getElementById("screen");

KeyListener.start();
var game = new Game(canvas.width, canvas.height);
requestAnimationFrame(gameLoop);

var tick = true;
function gameLoop(){
  if (tick) {
    game.update();
    Render([game.fruit]);
    Render(game.players);
  }
  tick = !tick;
  if (game.over) {
    console.log('Game Over');
    console.log(game.players[0].score);
    console.log(game.players[1].score);
  } else {
    requestAnimationFrame(gameLoop);
  }
}
