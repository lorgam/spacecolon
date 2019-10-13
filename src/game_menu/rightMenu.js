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
		var context = GLOBALS.context;
		var top = GLOBALS.topMenuHeight;

		context.fillStyle = GLOBALS.backgroundColor;
		context.fillRect(GLOBALS.mainScreenWidth, top, GLOBALS.rightMenuSize(), GLOBALS.bottomOfMap() - top);

		RightMenu.nextTurnBtn.draw();
	},

	mouseClick : () => {
		RightMenu.nextTurnBtn.isClicked();
	}
}

export default RightMenu;
