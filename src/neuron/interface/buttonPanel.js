import MenuControl from './menuControl.js';

function ButtonPanel(control, size, vertical = false){
  this.control = control;
  this.size = size;
  this.v = vertical;
  this.reset();
}

ButtonPanel.prototype.reset = function() {
  this.panel = {
    back : null,
    btn : []
  };

  this.lastPos = (this.v ? this.control.top : this.control.left);
};

ButtonPanel.prototype.addButton = function(btn){
  var control;
  if (this.v) control = new MenuControl(this.control.left, this.lastPos, this.control.width, this.size);
  else control = new MenuControl(this.lastPos, this.control.top, this.size, this.control.height);

  btn.control = control;
  this.lastPos += this.size;
  this.panel.btn[this.panel.btn.length] = btn;
}

ButtonPanel.prototype.draw = function(){
  this.panel.btn.forEach((e) => {e.draw();});
}

ButtonPanel.prototype.isClicked = function(){
  this.panel.btn.forEach((e) => {e.isClicked();});
}

export default ButtonPanel;

