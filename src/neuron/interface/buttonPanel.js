import MenuControl	from './menuControl.js';

function ButtonPanel(control, size, startingPoint, vertical = false){
	this.control = control;
	this.size = size;
	this.v = vertical;

	this.panel = {
		back : null,
		btn : []
	};

	this.lastPos = startingPoint;
}

ButtonPanel.prototype.addButton = function(btn){
	var control;
	if (this.v) {
		control = new MenuControl(this.control.left, this.lastPos, this.control.width, this.size);
	} else {
		control = new MenuControl(this.lastPos, this.control.top, this.size, this.control.height);
	}

	btn.control = control;
	this.lastPos += this.size;
	this.panel.btn[this.panel.btn.length] = btn;
}

ButtonPanel.prototype.draw = function(){
	var i;
	for (i in this.panel.btn) this.panel.btn[i].draw();
}

ButtonPanel.prototype.isClicked = function(){
	var i;
	for (i in this.panel.btn) this.panel.btn[i].isClicked();
}

export default ButtonPanel;

