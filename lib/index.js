const KeyListener = require("./keyListener");
const Game        = require("./game");
const Render      = require("./render");

KeyListener.start();
var game = new Game();
requestAnimationFrame(gameLoop);

function gameLoop(){
  game.update();
  Render(game.firstPlayer);
  Render(game.secondPlayer);
  requestAnimationFrame(gameLoop);
}
