function MenuControl(left, top, width, height, marginLeft = 5, marginTop = 5){
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
	this.marginLeft = marginLeft;
	this.marginTop = marginTop;
}

MenuControl.prototype.advanceHor = function(){
	this.left += this.width + this.marginLeft;
}

MenuControl.prototype.advanceVer = function(){
	this.top += this.height + this.marginTop;
}

export default MenuControl;
