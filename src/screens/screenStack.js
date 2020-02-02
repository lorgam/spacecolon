import INPUT from '../globals/input.js';

const ScreenStack = {
  stack : []
}

ScreenStack.screenExists = function(){
  return this.stack.length > 0;
}

ScreenStack.addScreen = function(screen){
  INPUT.keyboard.ENTER.execute(); //Clean enter
  this.stack.unshift(screen);
}
ScreenStack.removeScreen = function(){
  INPUT.keyboard.ENTER.execute(); //Clean enter
  return this.stack.shift();
}

ScreenStack.draw = function(){
  this.stack[0].draw();
}
ScreenStack.update = function(elapsedTime){
  this.stack[0].update(elapsedTime);
}
export default ScreenStack;

