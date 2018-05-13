var path = require('path');
var webpack = require("webpack");

var plugins = [];
// var entry = [
// 	'./src/index.js',
// ]

module.exports = {
	// entry,
	plugins,
	output: {
		devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
		devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use:[
					{
						loader: 'babel-loader',
						// query: {
						//   babelrc:false,
						//   presets: [ path.join(__dirname,'node_modules/babel-preset-es2015') ]
						// }
					},
				]
			},
			{
				test: [ /\.vert$/, /\.frag$/, /\.html$/],
				use: 'raw-loader'
			},
			{ test: /\.json\.js/, exclude: /node_modules/, loader: 'tojson-loader'}
		]
	},
	resolve:{
		alias:{
			utils:require.resolve('./src/modules/utils.js')
		}
	}
	// externals:{
	// 	phaser: "Phaser",
	// 	Phaser: "Phaser",
	// },
};
