const path = require('path');
const glob = require('glob');

let mode = 'production';
let entry = './src/index.js';
let filename = 'main.js';
let filepath = path.resolve(__dirname, 'dist');
let devtool = false;

if (process.env.TESTBUILD) {
		entry = glob.sync(__dirname + '/test/**/*.test.js');
		filepath = path.resolve(__dirname, 'test-dist');
		devtool = 'source-map';
}

module.exports = {
  mode : mode,
  entry : entry,
  output : {
    filename : filename,
    path : filepath
  },
  devtool : devtool
};
