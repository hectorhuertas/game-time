const assert = require("chai").assert;
const Player = require("../lib/player");

describe("Player", function(){
    it("has default attributes", function(){
      var player = new Player({});

      assert.equal(player.x, 50);
      assert.equal(player.y, 50);
      assert.equal(player.height, 10);
      assert.equal(player.width, 10);
      assert.equal(player.speed, 2);
      assert.equal(player.speedX, 2);
      assert.equal(player.speedY, 0);
    });

    it('takes attributes from options', function() {
      var attributes = {x: 5, y: 44, height: 8, width: 91, speed: 12};
      var player = new Player(attributes);

      assert.equal(player.x, attributes.x);
      assert.equal(player.y, attributes.y);
      assert.equal(player.height, attributes.height);
      assert.equal(player.width, attributes.width);
      assert.equal(player.speed, attributes.speed);
      assert.equal(player.speedX, attributes.speed);
      assert.equal(player.speedY, 0);
    });

    it('faces left', function(){
      var player = new Player({});
      player.faceLeft();

      assert.equal(player.speedX, -player.speed);
      assert.equal(player.speedY, 0);
    });

    it('faces right', function(){
      var player = new Player({});
      player.faceRight();

      assert.equal(player.speedX, player.speed);
      assert.equal(player.speedY, 0);
    });

    it('faces up', function(){
      var player = new Player({});
      player.faceUp();

      assert.equal(player.speedY, -player.speed);
      assert.equal(player.speedX, 0);
    });

    it('faces down', function(){
      var player = new Player({});
      player.faceDown();

      assert.equal(player.speedY, player.speed);
      assert.equal(player.speedX, 0);
    });

});
