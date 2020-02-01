import INPUT from '../globals/input.js';

function BaseState(){
  this.nextState = null;
}

BaseState.prototype.changeState = function(screen) {
  if (this.nextState != null){ //Change the state
    //Events
    this.nextState.select();
    //Swap the state
    var aux = this.nextState;
    this.nextState = null;
    screen.currentState = aux;
    //Clean inputs
    INPUT.resetKeyboard();
  }
};

BaseState.prototype.update = function() {};
BaseState.prototype.draw = function() {};
BaseState.prototype.select = function() {};

export default BaseState;

