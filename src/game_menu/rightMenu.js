import GLOBALS		from '../globals/globals.js';
import turnManager	from '../neuron/turnManager.js';
import MenuControl	from '../neuron/interface/menuControl.js';
import TextButton	from '../neuron/interface/textButton.js';

const RightMenu = {
	init : () => {
		// next Turn
		var topNxtTrnBtn = GLOBALS.bottomOfMap() - GLOBALS.verticalButtonSize;
		var ctrl = new MenuControl(GLOBALS.mainScreenWidth, topNxtTrnBtn, GLOBALS.rightMenuSize(), GLOBALS.verticalButtonSize);
		RightMenu.nextTurnBtn = new TextButton(RightMenu, ctrl, "#008", "general", "nextTurn", GLOBALS.highlightColor, () => {turnManager.advance();} );
	},

	draw : (worldMap) => {
		var ctx = GLOBALS.context;
		var top = GLOBALS.topMenuHeight;
		//Draw background
		ctx.fillStyle = GLOBALS.backgroundColor;
		ctx.fillRect(GLOBALS.mainScreenWidth, top, GLOBALS.rightMenuSize(), GLOBALS.bottomOfMap() - top);

		if (worldMap.parent.unitSelected){
			ctx.fillStyle	=  GLOBALS.textColor;
			ctx.font	=  GLOBALS.buttonFont;
			top		+= GLOBALS.fontHeight();

			ctx.fillText(worldMap.parent.unitSelected.text(), GLOBALS.mainScreenWidth, top);
		}

		top = GLOBALS.topMenuHeight;

		RightMenu.nextTurnBtn.draw();
	},

	mouseClick : () => {
		RightMenu.nextTurnBtn.isClicked();
	}
}

export default RightMenu;
