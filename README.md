# spacecolon
Prototype of a Javascript game inspired on Sid Meier's Colonization in space with multiple endings.

Available at [`lorgam.github.io/spacecolon`](https://lorgam.github.io/spacecolon/)

## Requirements
* browser that supports HTML5.

## NAVIGATION

### Global

* `ESC` to go back.
* `O` to show the options menu.

### In-game

* `ARROW` keys to navigate the map or click on the minimap.
* `C` to center the view on the starting point.
* `V` to change view from normal to height map to humidity map to blocks view.
* `SPACE` to advance a turn
* `LEFT CLICK` to move a selected unit

### Options menu

* `ARROW` keys to select menu options.
* `ENTER` to use the selected menu option.

## DEVELOPMENT
The development of the game is configured through `docker compose` with `make` commands.

There is an `index.html` file on the root of the project which is the entrypoint of the development version of the game, all the source code is on the `src` folder.
Simply run `make up` and you will have the development version running in `http://spacecolon.docker.localhost/`.
Run `make stop` to stop the server.

### Production version
The files are in the [gh-pages branch](https://github.com/lorgam/spacecolon/tree/gh-pages), but you can manually generate the files.
* Execute `npm i` or `make install` to install the node packages.
* Execute `npm run build` or `make build` to generate the distribution files in the dist folder.

### Testing
Execute `npm run test` or `make test`

## HISTORY
03/25/2019 For now is just a map generated with perlin noise.

12/06/2019 Movement and units, something like a city

