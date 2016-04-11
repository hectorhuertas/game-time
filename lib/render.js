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

  gameOver: function (p1score, p2score) {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.font = "48px serif";
    ctx.fillText('Player One Score: ' + p1score, canvas.width/5.5, canvas.height/4);
    ctx.fillText('Player Two Score: ' + p2score, canvas.width/5.5, canvas.height/4*2.5);
  }
};

module.exports = Render;
