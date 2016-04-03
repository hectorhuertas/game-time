const Player = require("./player");
const KeyPressed = require("./keyPressed");

var Game = function(width, height){
  this.width = width;
  this.height = height;
  this.KeyPressed = KeyPressed;
  this.occupiedPositions = [];
  createPlayers(this);
  spawnFruit(this)
  this.grid = 10;
  this.firstPlayer = new Player({game: this, controls: 'arrows'});
};

Game.prototype.update = function () {
  // debugger
  // spawnFruit(this);
  orientPlayers(this.players);
  movePlayers(this.players);
  checkScores(this.players);
  checkDeaths(this.players);
  logPositions(this, this.players);
};

function checkScores(players){
  players.forEach(function(player) {
    if (player.scored()) {
      // move fruit (and delete past render)
      spawnFruit(player.game);
      console.log('SCORE!!! at '+ player.position().toString()); }
  });
}


function spawnFruit (game) {
  var x = Math.floor(Math.random() * 45) * 10;
  var y = Math.floor(Math.random() * 45) * 10;
  // console.log(x);
  game.fruit = {x: x, y: y, size: 10};
}

function createPlayers (game) {
  game.players = [];
  var grid = 10;
  var gridWidth = Math.floor(game.width / grid);
  var gridHeight = Math.floor(game.height / grid);
  var playerOne = { game: game, controls: 'wasd', speed: grid,
                    x: grid * Math.floor(gridWidth / 8),
                    y: grid * Math.floor(gridHeight / 2) };
  var playerTwo = { game: game, controls: 'arrows',speed: grid,
                    x: grid * Math.floor(gridWidth / 8) * 7,
                    y: 20 + grid * Math.floor(gridHeight / 2) };

  game.players.push(new Player(playerOne));
  game.players.push(new Player(playerTwo));

  game.players[1].faceLeft();
}

function orientPlayers (players) {
  players.forEach(function(player) { player.orient(); });
}

function movePlayers (players) {
  players.forEach(function(player) { player.move(); });
}

var logPositions = function (game, players) {
  players.forEach(function(player) {
    game.occupiedPositions[player.x] = game.occupiedPositions[player.x] || [];
    game.occupiedPositions[player.x][player.y] = true;
   });
};

function checkDeaths(players){
  players.forEach(function(player) {
    if (player.died()) {
      player.game.over = true;
      console.log(player.controls +' collision!!! at '+ player.position().toString()); }
  });
}

module.exports = Game;
