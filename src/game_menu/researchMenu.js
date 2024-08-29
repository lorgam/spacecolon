import GLOBALS from '../globals/globals.js';
import texts from '../globals/texts.js';

const ResearchMenu = {
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
    }

  }
}

export default ResearchMenu;
