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
    Render.all(game.players.concat(game.fruit));
  }
  tick = !tick;
  if (game.over) {
    Render.gameOver(game.players[0].score, game.players[1].score);
  } else {
    requestAnimationFrame(gameLoop);
  }
}
