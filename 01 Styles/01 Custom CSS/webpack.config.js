var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = __dirname;

module.exports = {
	entry: {
		 vendor: ["jquery"],
		 app: "./students.js"
	},
	output: {
		path: path.join(basePath, "dist"),
		filename: "bundle.js"
	},

	devtool: 'source-map',

	module: {
		loaders: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader"
			},			
			{
				test: /\.js$/,
        loader: "babel-loader",
				exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
			}
		]
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
		new webpack.ProvidePlugin({
		      $: "jquery",
		      jQuery: "jquery"
		}),
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
			hash: true
    })
  ]
}
