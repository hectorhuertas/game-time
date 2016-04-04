const setState = function(state){
  switch (event.keyCode) {
    case 37: KeyPressed.left  = state; break;
    case 39: KeyPressed.right = state; break;
    case 38: KeyPressed.up    = state; break;
    case 40: KeyPressed.down  = state; break;

    case 65: KeyPressed.a = state; break;
    case 68: KeyPressed.d = state; break;
    case 87: KeyPressed.w = state; break;
    case 83: KeyPressed.s = state; break;
  }
};

var KeyPressed = {
  left:  false,
  right: false,
  up:    false,
  down:  false,
  a:     false,
  d:     false,
  w:     false,
  s:     false,
  setState: setState
};

module.exports = KeyPressed;
