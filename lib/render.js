const canvas  = document.getElementById("screen");
const ctx = canvas.getContext("2d");
canvas.focus();

var Render = {
  all: function(bodies) {
    bodies.forEach(function(body){
      ctx.fillStyle="#18ffff";
      ctx.fillRect(body.x, body.y, body.size, body.size);
    });
  }
};

module.exports = Render;
