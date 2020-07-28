import GLOBALS from '../globals/globals.js';
import INPUT from '../globals/input.js';
import MenuControl from '../neuron/interface/menuControl.js';
import ButtonPanel from '../neuron/interface/buttonPanel.js';
import TextButton from '../neuron/interface/textButton.js';

// Internal menu for things inside a map (buildings, units, cities...)
const InnerRightMenu = {}

InnerRightMenu.control = new MenuControl(GLOBALS.mainScreenWidth, GLOBALS.topMenuHeight, GLOBALS.rightMenuSize());
InnerRightMenu.panel = new ButtonPanel(InnerRightMenu.control, GLOBALS.verticalButtonSize, true);
//Back button
InnerRightMenu.backCtrl = new MenuControl(GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap() - GLOBALS.verticalButtonSize, GLOBALS.rightMenuSize(), GLOBALS.verticalButtonSize);
InnerRightMenu.back = new TextButton(null, InnerRightMenu.backCtrl, "#008", "general", "back", GLOBALS.highlightColor, function(){this.parent.unSelect();});

InnerRightMenu.draw = (object, text = null) => {
  let ctx = GLOBALS.context;
  let top = GLOBALS.topMenuHeight;
  //Background
  ctx.fillStyle = GLOBALS.backgroundColor;
  ctx.fillRect(GLOBALS.mainScreenWidth, top, GLOBALS.rightMenuSize(), GLOBALS.bottomOfMap() - top);
  //Right panel
  InnerRightMenu.panel.draw();
  InnerRightMenu.back.draw();
}

InnerRightMenu.click = () => {
  if (INPUT.mouse.rightMenuClicked) {
    InnerRightMenu.panel.isClicked();
    InnerRightMenu.back.isClicked();
  }
}

InnerRightMenu.configure = object => {
  InnerRightMenu.panel.reset();
  InnerRightMenu.back.parent = object;

  Object.keys(object.options).forEach(key => {
    let option = object.options[key];
    if (option.isValid(object)) InnerRightMenu.panel.addButton(new TextButton(object, null, "#008", "general", option.text, GLOBALS.highlightColor, option.click));
  });
}

export default InnerRightMenu;

