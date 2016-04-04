/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var KeyListener = __webpack_require__(1);
	var Game = __webpack_require__(3);
	var Render = __webpack_require__(7);

	var canvas = document.getElementById("screen");

	KeyListener.start();
	var game = new Game(canvas.width, canvas.height);
	requestAnimationFrame(gameLoop);

	var tick = true;
	function gameLoop() {
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var KeyPressed = __webpack_require__(2);

	var KeyListener = {
	  start: function start() {
	    window.addEventListener('keydown', KeyPressed.setState.bind(null, true));
	    window.addEventListener('keyup', KeyPressed.setState.bind(null, false));
	  }
	};

	module.exports = KeyListener;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var setState = function setState(state) {
	  switch (event.keyCode) {
	    case 37:
	      KeyPressed.left = state;break;
	    case 39:
	      KeyPressed.right = state;break;
	    case 38:
	      KeyPressed.up = state;break;
	    case 40:
	      KeyPressed.down = state;break;

	    case 65:
	      KeyPressed.a = state;break;
	    case 68:
	      KeyPressed.d = state;break;
	    case 87:
	      KeyPressed.w = state;break;
	    case 83:
	      KeyPressed.s = state;break;
	  }
	};

	var KeyPressed = {
	  left: false,
	  right: false,
	  up: false,
	  down: false,
	  setState: setState
	};

	module.exports = KeyPressed;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Player = __webpack_require__(4);
	var KeyPressed = __webpack_require__(2);
	var Fruit = __webpack_require__(5);
	var Grid = __webpack_require__(6);

	var Game = function Game(width, height) {
	  this.grid = new Grid(10, width, height);
	  this.KeyPressed = KeyPressed;
	  this.occupiedPositions = [];
	  this.fruit = new Fruit(this);
	  createPlayers(this);
	};

	Game.prototype.update = function () {
	  orientPlayers(this.players);
	  movePlayers(this.players);
	  checkScores(this.players);
	  checkDeaths(this.players);
	  logPositions(this, this.players);
	};

	function checkScores(players) {
	  players.forEach(function (player) {
	    if (player.scored()) {
	      player.game.fruit.reposition();
	    }
	  });
	}

	function createPlayers(game) {
	  game.players = [];
	  game.players.push(new Player({ game: game, controls: 'wasd' }));
	  game.players.push(new Player({ game: game, controls: 'arrows' }));

	  game.players[1].faceLeft();
	}

	function orientPlayers(players) {
	  players.forEach(function (player) {
	    player.orient();
	  });
	}

	function movePlayers(players) {
	  players.forEach(function (player) {
	    player.move();
	  });
	}

	var logPositions = function logPositions(game, players) {
	  players.forEach(function (player) {
	    game.occupiedPositions[player.x] = game.occupiedPositions[player.x] || [];
	    game.occupiedPositions[player.x][player.y] = true;
	  });
	};

	function checkDeaths(players) {
	  players.forEach(function (player) {
	    if (player.died()) {
	      player.game.over = true;
	      console.log('collision!!! at ' + player.position().toString());
	    }
	  });
	}

	module.exports = Game;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function Player(options) {
	  this.game = options.game;
	  this.controls = options.controls;
	  this.score = 0;
	  var p1X = this.game.grid.P1X();
	  var p2X = this.game.grid.P2X();
	  this.x = options.x || (this.controls === 'wasd' ? p1X : p2X) || 50;
	  this.y = options.y || this.game.grid.middleY() || 50;
	  this.speed = this.game.grid.size;
	  this.size = this.speed;
	  this.faceRight();
	}

	Player.prototype.faceDirection = function (speedX, speedY) {
	  this.speedX = speedX;
	  this.speedY = speedY;
	};

	Player.prototype.faceLeft = function () {
	  this.faceDirection(-Math.abs(this.speed), 0);
	};
	Player.prototype.faceRight = function () {
	  this.faceDirection(Math.abs(this.speed), 0);
	};
	Player.prototype.faceUp = function () {
	  this.faceDirection(0, -Math.abs(this.speed));
	};
	Player.prototype.faceDown = function () {
	  this.faceDirection(0, Math.abs(this.speed));
	};

	Player.prototype.died = function () {
	  var wall = this.x < 0 || this.y < 0 || this.x >= this.game.grid.realWidth || this.y >= this.game.grid.realHeight;
	  var players = this.game.occupiedPositions[this.x] && this.game.occupiedPositions[this.x][this.y];

	  var death = wall || players;

	  if (death) {
	    this.score -= 2500;
	  }

	  return death;
	};

	Player.prototype.scored = function () {
	  var x = this.x === this.game.fruit.x;
	  var y = this.y === this.game.fruit.y;

	  var score = x && y;

	  if (score) {
	    this.score += 1000;
	  }

	  return score;
	};

	Player.prototype.move = function () {
	  this.x += this.speedX;
	  this.y += this.speedY;
	};

	Player.prototype.orient = function () {
	  if (this.controls === 'arrows') {
	    if (this.game.KeyPressed.left) {
	      this.faceLeft();
	    }
	    if (this.game.KeyPressed.right) {
	      this.faceRight();
	    }
	    if (this.game.KeyPressed.up) {
	      this.faceUp();
	    }
	    if (this.game.KeyPressed.down) {
	      this.faceDown();
	    }
	  } else if (this.controls === 'wasd') {
	    if (this.game.KeyPressed.a) {
	      this.faceLeft();
	    }
	    if (this.game.KeyPressed.d) {
	      this.faceRight();
	    }
	    if (this.game.KeyPressed.w) {
	      this.faceUp();
	    }
	    if (this.game.KeyPressed.s) {
	      this.faceDown();
	    }
	  }

	  return this;
	};

	Player.prototype.position = function () {
	  return [this.x, this.y];
	};

	module.exports = Player;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	function Fruit(game) {
	  this.game = game;
	  this.size = game.grid.size;
	  this.reposition();
	}

	Fruit.prototype.reposition = function () {
	  this.x = this.game.grid.randomX();
	  this.y = this.game.grid.randomY();
	};

	module.exports = Fruit;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function Grid(size, width, height) {
	  if (width % size !== 0 || height % size !== 0) {
	    throw 'Grid does not fit in canvas';
	  }

	  this.size = size;
	  this.width = width / size;
	  this.height = height / size;
	  this.realWidth = width;
	  this.realHeight = height;
	}

	Grid.prototype.randomX = function () {
	  return Math.floor(Math.random() * this.width) * this.size;
	};

	Grid.prototype.randomY = function () {
	  return Math.floor(Math.random() * this.height) * this.size;
	};

	Grid.prototype.middleY = function () {
	  return this.height / 2 * this.size;
	};

	Grid.prototype.P1X = function () {
	  return Math.floor(this.height / 8) * this.size;
	};

	Grid.prototype.P2X = function () {
	  return Math.floor(this.height / 8 * 7) * this.size;
	};

	module.exports = Grid;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var canvas = document.getElementById("screen");
	var ctx = canvas.getContext("2d");
	canvas.focus();

	var Render = function Render(bodies) {
	  bodies.forEach(function (body) {
	    ctx.fillRect(body.x, body.y, body.size, body.size);
	  });
	};

	module.exports = Render;

/***/ }
/******/ ]);