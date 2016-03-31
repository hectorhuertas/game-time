const assert = require("chai").assert;
const Player = require("../lib/player");
const Game = require("../lib/game");

describe("Player", function(){
  context('when created', function(){
    it("has default attributes", function(){
      var player = new Player('game', {});

      assert.equal(player.x, 50);
      assert.equal(player.y, 50);
      assert.equal(player.height, 10);
      assert.equal(player.width, 10);
      assert.equal(player.speed, 3);
      assert.equal(player.speedX, 3);
      assert.equal(player.speedY, 0);
    });

    it('takes attributes from options', function() {
      var attributes = {x: 5, y: 44, height: 8, width: 91, speed: 12};
      var player = new Player('game', attributes);

      assert.equal(player.x, attributes.x);
      assert.equal(player.y, attributes.y);
      assert.equal(player.height, attributes.height);
      assert.equal(player.width, attributes.width);
      assert.equal(player.speed, attributes.speed);
      assert.equal(player.speedX, attributes.speed);
      assert.equal(player.speedY, 0);
    });
  });

  context('movement', function(){
    it('moves according to speed', function(){
      var game = new Game();
      var player = new Player(game, {x: 1, y: 1} );
      player.speedX = 10;
      player.speedY = 20;

      player.move();

      assert.equal(player.x, 11);
      assert.equal(player.y, 21);
    });
  });

  context('control', function(){
    it('faces left when left arrow is pressed', function(){
      var game = new Game();
      var player = new Player(game, {});
      game.KeyPressed.left = true;

      player.orient();
      assert.equal(player.speedX, -player.speed);
      assert.equal(player.speedY, 0);
    });

    it('faces right when right arrow is pressed', function(){
      var game = new Game();
      var player = new Player(game, {});
      player.speedX = 'default';
      player.speedY = 'default';
      game.KeyPressed.right = true;

      player.orient();
      assert.equal(player.speedX, player.speed);
      assert.equal(player.speedY, 0);
    });

    it('faces up when up arrow is pressed', function(){
      var game = new Game();
      var player = new Player(game, {});
      game.KeyPressed.up = true;

      player.orient();
      assert.equal(player.speedX, 0);
      assert.equal(player.speedY, -player.speed);
    });

    it('faces down when down arrow is pressed', function(){
      var game = new Game();
      var player = new Player(game, {});
      game.KeyPressed.down = true;

      player.orient();
      assert.equal(player.speedX, 0);
      assert.equal(player.speedY, player.speed);
    });
  });

  context('collisions', function(){
    it('dies', function(){
      var game = new Game();
      var player = new Player(game, {});
      assert.isNotTrue(player.died());

      game.logPosition(player.position());
      assert(player.died());
    });


  });
});
