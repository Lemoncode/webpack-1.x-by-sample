var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = __dirname;
var outputPath = 'dist';

module.exports = {
	entry: ["./students.js"],
	output: {
		path: path.join(basePath, "dist"),
		filename: "bundle.js"
	},

	devtool: 'source-map',

	module: {
		loaders: [
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
		new webpack.DllReferencePlugin({
			    context: './dll',
		      manifest: require('./dll/vendor-manifest.json')
				 ,name: './dll/vendor.dll.js'
		}),

    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
			hash: true
    })
  ]
}
