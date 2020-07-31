import GLOBALS from '../../globals/globals.js';
import INPUT from '../../globals/input.js';
import collision2d from '../physics/collision2d.js';

function BaseButton(parent, control, backColor, click, enabled = true){
  this.parent = parent;
  this.control = control;
  this.backColor = backColor;
  if (click) this.click = click;
  this.enabled = enabled;
}

BaseButton.prototype.draw = function(){
  this.drawBackGround();
  this.drawEnabled();
}

BaseButton.prototype.drawBackGround = function(){
  GLOBALS.context.fillStyle = this.backColor;
  GLOBALS.context.fillRect(this.control.left, this.control.top, this.control.width, this.control.height);
}

BaseButton.prototype.drawEnabled = function(){
  if (this.enabled) return;

  GLOBALS.context.fillStyle = "#000";
  GLOBALS.context.globalAlpha = 0.5;
  GLOBALS.context.fillRect(this.control.left, this.control.top, this.control.width, this.control.height);
  GLOBALS.context.globalAlpha = 1;
}

BaseButton.prototype.isClicked = function(){
  if (this.enabled && collision2d.pointInRectangle(INPUT.mouse, this.control.getRect())) this.click();
}

BaseButton.prototype.click = function(){}

export default BaseButton;

