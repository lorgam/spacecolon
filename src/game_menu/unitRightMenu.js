import GLOBALS from '../globals/globals.js';
import INPUT from '../globals/input.js';
import MenuControl from '../neuron/interface/menuControl.js';
import ButtonPanel from '../neuron/interface/buttonPanel.js';
import TextButton from '../neuron/interface/textButton.js';

const UnitRightMenu = {}

UnitRightMenu.control = new MenuControl(GLOBALS.mainScreenWidth, 90, GLOBALS.rightMenuSize());
UnitRightMenu.panel = new ButtonPanel(UnitRightMenu.control, GLOBALS.verticalButtonSize, true);
//Back button
UnitRightMenu.backCtrl = new MenuControl(GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap() - GLOBALS.verticalButtonSize, GLOBALS.rightMenuSize(), GLOBALS.verticalButtonSize);
UnitRightMenu.back = new TextButton(null, UnitRightMenu.backCtrl, "#008", "general", "back", GLOBALS.highlightColor, function(){this.parent.unSelect();});

UnitRightMenu.draw = unit => {
  let ctx = GLOBALS.context;
  let top = GLOBALS.topMenuHeight;
  //Draw background
  ctx.fillStyle = GLOBALS.backgroundColor;
  ctx.fillRect(GLOBALS.mainScreenWidth, top, GLOBALS.rightMenuSize(), GLOBALS.bottomOfMap() - top);
  //Unit name
  ctx.fillStyle = GLOBALS.textColor;
  ctx.font = GLOBALS.buttonFont;
  top += GLOBALS.fontHeight();

  ctx.fillText(unit.text(), GLOBALS.mainScreenWidth, top);
  top += GLOBALS.fontHeight();
  //Unit pos
  ctx.font = GLOBALS.normalFont;
  ctx.fillText('x:'+unit.pos.x + ' y:' + unit.pos.y, GLOBALS.mainScreenWidth, top);
  //Right panel
  UnitRightMenu.panel.draw();
  UnitRightMenu.back.draw();
}

UnitRightMenu.click = () => {
  if (INPUT.mouse.rightMenuClicked) {
    UnitRightMenu.panel.isClicked();
    UnitRightMenu.back.isClicked();
  }
}

UnitRightMenu.configure = unit => {
  UnitRightMenu.panel.reset();
  UnitRightMenu.back.parent = unit;

  Object.keys(unit.options).forEach(key => {
    let option = unit.options[key];
    UnitRightMenu.panel.addButton(new TextButton(unit, null, "#008", "general", option.text, GLOBALS.highlightColor, option.click));
  });
}

export default UnitRightMenu;

