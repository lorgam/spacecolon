import GLOBALS from '../globals/globals.js';
import textureManager from '../neuron/textureManager.js';

const baseResourceManager = {}

baseResourceManager.generateResource = function(worldMap, manager, resourceType, type, terrain, proportion){
  var x, y, tile;
  var total = 0;
  var ctx = worldMap.mapCanvas.getContext('2d');

  for (x = 0; x < terrain.length; x++) total += worldMap.stats[terrain[x]];
  total = ~~(total  * proportion);

  while (total > 0){
    x = ~~(Math.random() * worldMap.options.width);
    y = ~~(Math.random() * worldMap.options.height);
    tile = worldMap.map[x][y];

    if (tile.resource || terrain.indexOf(tile.type) == -1 || tile.city) continue; // Resource not allowed
    total--;

    tile.resource = manager.resources[type];
    ctx.drawImage(textureManager.textures[resourceType][type], x * GLOBALS.maxTileSize(), y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
  }
}

export default baseResourceManager;

