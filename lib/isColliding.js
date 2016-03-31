var isColliding = function(player, positions){
  var walls = player.x < 0 || player.y <0 || player.x > 500 || player.y > 500;
  var itself =  positions[player.x] && positions[player.x][player.y];
  return walls || itself;
};

module.exports = isColliding;
