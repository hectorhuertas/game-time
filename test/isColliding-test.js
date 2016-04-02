const assert = require("chai").assert;
const Player = require("../lib/player");
const isColliding = require("../lib/isColliding");

describe('isColliding', function(){
  context('', function(){
    it('detects collisions', function() {
      var player = new Player('game', {x: 50, y: 70});
      var positions = [];

      assert.equal(undefined,isColliding(player, positions));

      positions[50] = [];
      positions[50][70] = true;

      assert(isColliding(player, positions));
    });
  });
});
