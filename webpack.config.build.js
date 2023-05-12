const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { marge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = marge(config, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'public'),
  },

  plugins: [new CleanWebpackPlugin()],
});
