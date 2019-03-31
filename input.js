const INPUT = {
	keyboard	: {},
	mouse		: {clicked:false,x:0,y:0},
	init : function(){
		INPUT.keyboard.ARROW_LEFT	= new inputKey(37);
		INPUT.keyboard.ARROW_UP		= new inputKey(38);
		INPUT.keyboard.ARROW_RIGHT	= new inputKey(39);
		INPUT.keyboard.ARROW_DOWN	= new inputKey(40);

		INPUT.keyboard.ENTER		= new inputKey(13);
		INPUT.keyboard.ALT			= new inputKey(18);
		INPUT.keyboard.ESC			= new inputKey(27);

		INPUT.keyboard.V			= new inputKey(86);
	},

	keyDown : function(keyCode){
		//@TODO: Replace this with an object that maps the inputKeys with their code
		for (var key in INPUT.keyboard){
			if (INPUT.keyboard[key].keyCode == keyCode) {
				INPUT.keyboard[key].keyDown();
				return;
			}
		}
	},

	mouseClick : function(x,y){
		INPUT.mouse.clicked		= true;
		INPUT.mouse.x			= x;
		INPUT.mouse.y			= y;
	},
	isClicked : function(){
		if (INPUT.mouse.clicked){
			INPUT.mouse.clicked = false;
			return true;
		}
		return false;
	}
};

export default INPUT;

function inputKey(keyCode){
	this.isPressed			= false;
	this.keyCode			= keyCode;
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