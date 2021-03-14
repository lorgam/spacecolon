import GLOBALS from '../globals/globals.js';
import texts from '../globals/texts.js';

const CityLowerMenu = {
  draw : function(city) {
    let context = GLOBALS.context;

    context.fillStyle = GLOBALS.backgroundColor;
    context.fillRect(0, GLOBALS.bottomOfMap(), GLOBALS.mainScreenWidth, GLOBALS.height - GLOBALS.bottomOfMap());

    // @TODO: Draw the construction queue
  }
}

export default CityLowerMenu;
