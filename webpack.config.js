// const path = require('path')
// const webpack = require('webpack')
// const CURRENT_WORKING_DIR = process.cwd()
// const config = { ... }
// module.exports = config
const path = require('path');

module.exports = {
 mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};