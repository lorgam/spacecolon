import GLOBALS from '../globals/globals.js';
import turnManager from '../neuron/turnManager.js';
import MenuControl from '../neuron/interface/menuControl.js';
import TextButton from '../neuron/interface/textButton.js';

const WorldRightMenu = {
  init : () => {
    var topNxtTrnBtn = GLOBALS.bottomOfMap() - GLOBALS.verticalButtonSize;
    var ctrl = new MenuControl(GLOBALS.mainScreenWidth, topNxtTrnBtn, GLOBALS.rightMenuSize(), GLOBALS.verticalButtonSize);
    WorldRightMenu.nextTurnBtn = new TextButton(WorldRightMenu, ctrl, "#008", "general", "nextTurn", GLOBALS.highlightColor, () => {turnManager.advance();} );
  },

  draw : (worldMap) => {
    let ctx = GLOBALS.context;
    let top = GLOBALS.topMenuHeight;
    //Draw background
    ctx.fillStyle = GLOBALS.backgroundColor;
    ctx.fillRect(GLOBALS.mainScreenWidth, top, GLOBALS.rightMenuSize(), GLOBALS.bottomOfMap() - top);

    top = GLOBALS.topMenuHeight;

    WorldRightMenu.nextTurnBtn.draw();
  },

  mouseClick : () => {
    WorldRightMenu.nextTurnBtn.isClicked();
  }
}

export default WorldRightMenu;

