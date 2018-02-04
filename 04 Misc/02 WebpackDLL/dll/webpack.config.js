var path = require("path");
var webpack = require("webpack");

var CopyWebpackPlugin = require('copy-webpack-plugin');

var basePath = __dirname;
var outputPath = 'dist';

module.exports = {
  context: process.cwd(),
  entry: {
    vendor:[
     'lodash',
    ]
  },

 output: {
    filename: '[name].dll.js',
    path: path.join(basePath, outputPath),
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(outputPath, '[name]-manifest.json')
    }),
    new CopyWebpackPlugin([
			{
				from: path.join(basePath, outputPath),
					to: path.join(basePath, '../app/dll/')
			}
		]),
  ]
};
