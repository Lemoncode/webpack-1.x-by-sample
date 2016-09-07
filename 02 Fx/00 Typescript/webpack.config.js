var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = __dirname;

module.exports = {
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	entry: ['./students.ts'],
	output: {
		path: path.join(basePath, 'dist'),
		filename: 'bundle.js'
	},

	devtool: 'source-map',

	module: {
		loaders: [
			{
				test: /\.(ts)$/,
				exclude: /node_modules/,
				loader: 'ts-loader'
      },
			{
				test: /\.js$/,
        loader: 'babel-loader',
				exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
			}
		]
	},
	plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
			hash: true
    })
  ]
}
