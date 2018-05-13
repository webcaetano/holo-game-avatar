var path = require('path');
var webpackConfig = require('./webpack.base.js');
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

webpackConfig.entry = {
	'game': './src/index.js',
	'game.min': './src/index.js',
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
	new CopyWebpackPlugin([
		{ from: './texture_sheets/*.{png,json}', to: './../ui' },
	],{})
])

webpackConfig.output = {
	library:'nice-little-butt',
	filename: './../ui/[name].js',
	sourceMapFilename: '[file].map',
	umdNamedDefine: true,
	devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
	devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
	libraryTarget:'umd'
}

module.exports = webpackConfig;
