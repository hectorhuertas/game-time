const KeyListener = require("./keyListener");
const Game        = require("./game");
const Render      = require("./render");

const canvas  = document.getElementById("screen");


KeyListener.start();

function startMenu(){
  var ctx = canvas.getContext("2d");
  var menu = new Image();
  menu.src = "./lib/assets/tron_start.png";

  ctx.drawImage(menu, 250, 250);

  KeyListener.start();
}

startMenu();

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
