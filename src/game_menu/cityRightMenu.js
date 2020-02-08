import GLOBALS from '../globals/globals.js';
import INPUT from '../globals/input.js';
import MenuControl from '../neuron/interface/menuControl.js';
import ButtonPanel from '../neuron/interface/buttonPanel.js';
import TextButton from '../neuron/interface/textButton.js';
import buildingManager from '../world_map/city/buildingManager.js';

const CityRightMenu = {}

CityRightMenu.city = null;
//RightPanel
CityRightMenu.control = new MenuControl(GLOBALS.mainScreenWidth, 90, GLOBALS.rightMenuSize());
CityRightMenu.panel = new ButtonPanel(CityRightMenu.control, GLOBALS.verticalButtonSize, true);
//Back button
CityRightMenu.backCtrl = new MenuControl(GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap() - GLOBALS.verticalButtonSize, GLOBALS.rightMenuSize(), GLOBALS.verticalButtonSize);
CityRightMenu.back = new TextButton(null, CityRightMenu.backCtrl, "#008", "general", "back", GLOBALS.highlightColor, function(){this.parent.unSelect();});

CityRightMenu.draw = city => {
  let ctx = GLOBALS.context;
  let top = GLOBALS.topMenuHeight;
  //Draw background
  ctx.fillStyle = GLOBALS.backgroundColor;
  ctx.fillRect(GLOBALS.mainScreenWidth, top, GLOBALS.rightMenuSize(), GLOBALS.bottomOfMap() - top);
  //Draw buttons
  CityRightMenu.panel.draw();
  CityRightMenu.back.draw();
}

CityRightMenu.click = () => {
  if (INPUT.mouse.rightMenuClicked) {
    CityRightMenu.panel.isClicked();
    CityRightMenu.back.isClicked();
  }
}

CityRightMenu.configure = city => {
  CityRightMenu.panel.reset();
  CityRightMenu.back.parent = city;

  for (var building in buildingManager.buildings) {
    let btn = new TextButton(city, null, "#008", "buildings", building, GLOBALS.highlightColor, buildingClick);
    CityRightMenu.panel.addButton(btn);
  }

  CityRightMenu.city = city;
}

function buildingClick() {
  var building = buildingManager.buildings[this.text];
  console.log(building);
}

export default CityRightMenu;

