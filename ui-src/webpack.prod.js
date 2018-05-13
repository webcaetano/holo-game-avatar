var path = require('path');
var webpackConfig = require('./webpack.base.js');
var webpack = require("webpack");

webpackConfig.entry = {
	'app': './src/index.js',
	'app.min': './src/index.js',
}

webpackConfig.plugins = webpackConfig.plugins.concat([
	new webpack.optimize.UglifyJsPlugin({
		include: /\.min\.js$/,
		minimize: true,
		compress: false
	}),
	new webpack.DefinePlugin({
	  __DEV__:false,
	}),
])

webpackConfig.output = {
	library:'app',
	filename: 'build/[name].js',
	sourceMapFilename: '[file].map',
	umdNamedDefine: true,
	devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
	devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
	libraryTarget:'umd'
}

module.exports = webpackConfig;
