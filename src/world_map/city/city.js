import GLOBALS		from '../../globals/globals.js';
import INPUT		from '../../globals/input.js';
import texts		from '../../globals/texts.js';
import unitManager	from '../../resources/unit/unitManager.js';
import BaseState	from '../../neuron/baseState.js';
import MenuControl	from '../../neuron/interface/menuControl.js';
import TextButton	from '../../neuron/interface/textButton.js';
import ButtonPanel	from '../../neuron/interface/buttonPanel.js';
import buildingManager	from './buildingManager.js';

function City(parent){
	BaseState.call(this);
	this.parent = parent;
	this.context = GLOBALS.context;
	// buttons
	var ctrl, btn;
	var topBackBtn = GLOBALS.bottomOfMap() - GLOBALS.verticalButtonSize;
	var top = GLOBALS.topMenuHeight;

	// back
	ctrl = new MenuControl(GLOBALS.mainScreenWidth, topBackBtn, GLOBALS.rightMenuSize(), GLOBALS.verticalButtonSize);
	btn = new TextButton(this, ctrl, "#008", "general", "back", GLOBALS.highlightColor, function(){this.parent.nextState = this.parent.parent.parent;});
	this.btnBack = btn;

	// right panel
	ctrl = new MenuControl(GLOBALS.mainScreenWidth, top, GLOBALS.rightMenuSize(), top - topBackBtn);
	this.rigthPanel = new ButtonPanel(ctrl, GLOBALS.verticalButtonSize, true);

	for (var building in buildingManager.buildings){
		btn = new TextButton(this, null, "#008", "buildings", building, GLOBALS.highlightColor, buildingClick);
		this.rigthPanel.addButton(btn);
	}

	// city resources
	unitManager.addRobot(this);
}

City.prototype = Object.create(BaseState.prototype);

City.prototype.text = function() {
	return "city";
}

City.prototype.update = function() {
	if (INPUT.mouse.clicked){
		this.btnBack.isClicked();
		this.rigthPanel.isClicked();
	}
}

City.prototype.draw = function() {
	this.drawBackground();
	this.btnBack.draw();
	this.rigthPanel.draw();
}

City.prototype.drawBackground = function() {
	this.parent.parent.draw();
	this.context.globalAlpha = 0.5;
	this.context.fillStyle = "#008";
	this.context.fillRect(0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
	this.context.globalAlpha = 1;
}

function buildingClick(number) {
	var building = buildingManager.buildings[this.text];
}

export default City;

