var path = require("path");
var webpack = require("webpack");

var basePath = __dirname;
var outputPath = 'dist';

module.exports = {
  context: process.cwd(),
  entry: {
    jqueryStuff:[
     'jquery',
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
      path: path.join(outputPath, '[name].json')
    })
  ]
};
