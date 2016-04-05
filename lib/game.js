const Player = require("./player");
const KeyPressed = require("./keyPressed");
const Fruit = require("./fruit");
const Grid = require("./grid");
const Skynet = require("./skynet");

var Game = function(width, height){
  this.grid = new Grid(10, width, height);
  this.KeyPressed = KeyPressed;
  this.occupiedPositions = [];
  this.fruit = new Fruit(this);
  this.skynet = new Skynet({});
  createPlayers(this);
};

Game.prototype.update = function () {
  orientPlayers(this.players);
  this.skynet.think(this);
  movePlayers(this.players);
  checkScores(this.players);
  checkDeaths(this.players);
  logPositions(this, this.players);
};

function checkScores(players){
  players.forEach(function(player) {
    if (player.scored()) { player.game.fruit.reposition(); }
  });
}

function createPlayers (game) {
  game.players = [];
  game.players.push(new Player({game: game, controls: 'wasd'}));
  // game.players.push(new Player({game: game, controls: 'arrows'}));

  // game.players[1].faceLeft();
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
      console.log('collision!!! at '+ player.position().toString()); }
  });
}

module.exports = Game;
