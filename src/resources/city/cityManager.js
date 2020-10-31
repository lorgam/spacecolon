import City from './city.js';
import GLOBALS from '../../globals/globals.js';
import textureManager from '../../neuron/textureManager.js';

const cityManager = {
  cities : []
};

cityManager.addCity = (worldMap, x, y) => {
  var mapContext    = worldMap.mapCanvas.getContext('2d');
  mapContext.drawImage(textureManager.textures['general']['city'], x * GLOBALS.maxTileSize(), y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());

  var city = new City(worldMap.map[x][y]);
  worldMap.map[x][y].building = city;
  cityManager.cities.push(city);

  return city;
}

cityManager.reset = () => {
  cityManager.cities = [];
}

export default cityManager;

