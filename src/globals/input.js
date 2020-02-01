import GLOBALS from "./globals.js";

const INPUT = {
  keyboard  : {aux:{}},
  mouse   : {
    x:0,
    y:0,

    clicked:false,
    mainWindowClicked :false,
    rightMenuClicked :false,
    lowerMenuClicked :false,
    miniMapClicked :false,

    reset : function(){
      INPUT.mouse.clicked = false;
      INPUT.mouse.mainWindowClicked = false;
      INPUT.mouse.rightMenuClicked = false;
      INPUT.mouse.lowerMenuClicked = false;
      INPUT.mouse.miniMapClicked = false;
    }
  },
  init : function(){
    INPUT.keyboard.ARROW_LEFT = new inputKey(37);
    INPUT.keyboard.ARROW_UP   = new inputKey(38);
    INPUT.keyboard.ARROW_RIGHT  = new inputKey(39);
    INPUT.keyboard.ARROW_DOWN = new inputKey(40);

    INPUT.keyboard.ENTER    = new inputKey(13);
    INPUT.keyboard.ALT      = new inputKey(18);
    INPUT.keyboard.ESC      = new inputKey(27);
    INPUT.keyboard.SPACE      = new inputKey(32);

    INPUT.keyboard.O      = new inputKey(79);
    INPUT.keyboard.C      = new inputKey(67);
    INPUT.keyboard.V      = new inputKey(86);
  },

  keyDown : function(keyCode){
    var key = INPUT.keyboard.aux[keyCode];
    if (key) key.keyDown();
  },

  mouseClick : function(x,y){
    INPUT.mouse.clicked   = true;
    INPUT.mouse.x     = x;
    INPUT.mouse.y     = y;

    if (INPUT.mouse.x < GLOBALS.mainScreenWidth){
      if (INPUT.mouse.y > GLOBALS.bottomOfMap()) INPUT.mouse.lowerMenuClicked = true;
      else if (INPUT.mouse.y > GLOBALS.topMenuHeight) INPUT.mouse.mainWindowClicked = true;
    } else {
      if (INPUT.mouse.y >= GLOBALS.bottomOfMap()) INPUT.mouse.miniMapClicked = true;
      else INPUT.mouse.rightMenuClicked = true;
    }
  },
  resetKeyboard : function(){
    Object.keys(INPUT.keyboard).forEach((k, v) => {if (INPUT.keyboard[k].execute) INPUT.keyboard[k].execute();});
  }
};

function inputKey(keyCode){
  this.isPressed        = false;
  this.keyCode        = keyCode;
  INPUT.keyboard.aux[keyCode] = this;
}

inputKey.prototype.keyDown = function(){
  this.isPressed = true;
}

inputKey.prototype.execute = function(){
  if (this.isPressed){
    this.isPressed = false;
    return true;
  }
  return false;
}

export default INPUT;

