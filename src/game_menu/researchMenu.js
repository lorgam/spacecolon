import GLOBALS from '../globals/globals.js';
import texts from '../globals/texts.js';
import TextButton from '../neuron/interface/textButton.js';
import MenuControl from '../neuron/interface/menuControl.js';

const ResearchMenu = {
  investigateBtn : new TextButton(
    null,
    new MenuControl(GLOBALS.mainScreenWidth - GLOBALS.rightMenuSize(), GLOBALS.bottomOfMap() - GLOBALS.verticalButtonSize * 5, GLOBALS.rightMenuSize(), GLOBALS.verticalButtonSize),
    "#008",
    "general",
    "investigateBtn",
    GLOBALS.highlightColor,
    () => {
      console.log("Investigate");
    }
  ),
  draw : function(selectedTech, treeWidth) {
    const ctx = GLOBALS.context;

    ctx.fillStyle = GLOBALS.backgroundColor;
    ctx.fillRect(treeWidth, GLOBALS.topMenuHeight, GLOBALS.width - treeWidth, GLOBALS.height - GLOBALS.topMenuHeight);

    if (selectedTech) {
      const padding = 20;
      let x = treeWidth + padding;
      let y = GLOBALS.topMenuHeight + padding;

      ctx.fillStyle = GLOBALS.textColor;
      ctx.font      = GLOBALS.buttonFont;
      ctx.fillText(selectedTech.name, x, y);
      y += padding;
      ctx.fillText(`Cost: ${selectedTech.cost}`, x, y);
      ResearchMenu.investigateBtn.draw();
    }

  }
}

export default ResearchMenu;
