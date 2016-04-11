const canvas  = document.getElementById("screen");
const ctx = canvas.getContext("2d");
canvas.focus();

var Render = {
  all: function (bodies) {
    bodies.forEach(function(body){
      ctx.fillStyle="#18ffff";
      ctx.fillRect(body.x, body.y, body.size, body.size);
    });
  },

  gameOver: function (scores) {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.font = "48px serif";
    ctx.fillText('Player One Score: ' + scores[0], canvas.width/5.5, canvas.height/4);
    ctx.fillText('Player Two Score: ' + scores[1], canvas.width/5.5, canvas.height/4*2.5);
  }
};

module.exports = Render;
