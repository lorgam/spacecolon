/**
 * Class that integrates all the info needed to place consecutive buttons
 */
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

MenuControl.prototype.getRect = function(){
	return {
		x0: this.left, x1: this.left + this.width,
		y0: this.top, y1: this.top + this.height
	}
}

export default MenuControl;
