const INPUT = {
	keyboard : {},
	init : function(){
		INPUT.keyboard.ARROW_LEFT	= new inputKey(37);
		INPUT.keyboard.ARROW_UP		= new inputKey(38);
		INPUT.keyboard.ARROW_RIGHT	= new inputKey(39);
		INPUT.keyboard.ARROW_DOWN	= new inputKey(40);

		INPUT.keyboard.ENTER		= new inputKey(13);
		INPUT.keyboard.ALT			= new inputKey(18);
		INPUT.keyboard.ESC			= new inputKey(27);
	},

	keyDown : function(keyCode){
		for (var key in INPUT.keyboard){
			if (INPUT.keyboard[key].keyCode == keyCode) INPUT.keyboard[key].keyDown();
		}
	},

	keyUp : function(keyCode){
		for (var key in INPUT.keyboard){
			if (INPUT.keyboard[key].keyCode == keyCode) INPUT.keyboard[key].keyUp();
		}
	}
};

export default INPUT;

function inputKey(keyCode){
	this.timePress	= 0.0;
	this.executed	= false;
	this.keyCode	= keyCode;
}


inputKey.prototype.keyUp = function(){
	this.timePress = 0.0;
}
inputKey.prototype.keyDown = function(){
	if (this.timePress == 0.0) this.timePress = Date.now();
}
inputKey.prototype.isPressed = function(){
	return (this.timePress > 0.0);
}