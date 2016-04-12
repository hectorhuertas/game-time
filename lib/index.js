const KeyListener = require("./keyListener");
const Game        = require("./game");
const Render      = require("./render");
const $           = require("jquery");

const canvas  = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var game;

$('#onePlayer').on('click',  newGame.bind(null, true));
$('#twoPlayers').on('click', newGame.bind(null, false));

KeyListener.start();
var tick = true;

function newGame (ai) {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  game = new Game(canvas.width, canvas.height, ai);
  requestAnimationFrame(gameLoop);
}

function gameLoop(){
  if (tick) {
    game.update();
    Render.all(game.bodies());
  }
  tick = !tick;
  if (game.over) {
    Render.gameOver(game.scores());
  } else {
    requestAnimationFrame(gameLoop);
  }
}
