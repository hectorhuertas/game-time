const KeyListener = require("./keyListener");
const Game        = require("./game");
const Render      = require("./render");
const $           = require("jquery");

const canvas  = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var game;
$('#onePlayer').on('click', onePlayer);
$('#twoPlayers').on('click', twoPlayers);

KeyListener.start();
var tick = true;

onePlayer();
function onePlayer () {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  game = new Game(canvas.width, canvas.height, true);
  requestAnimationFrame(gameLoop);
}
function twoPlayers () {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  game = new Game(canvas.width, canvas.height);
  requestAnimationFrame(gameLoop);
}

function gameOver(p1score, p2score) {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.font = "48px serif";
  ctx.fillText('Player One Score: ' + p1score, canvas.width/5.5, canvas.height/4);
  ctx.fillText('Player Two Score: ' + p2score, canvas.width/5.5, canvas.height/4*2.5);
}

function gameLoop(){
  if (tick) {
    game.update();
    Render([game.fruit]);
    Render(game.players);
  }
  tick = !tick;
  if (game.over) {
    gameOver(game.players[0].score, game.players[1].score);
  } else {
    requestAnimationFrame(gameLoop);
  }
}
