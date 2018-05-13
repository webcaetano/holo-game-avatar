var webpack = require("webpack");
var webpackConfig = require('./webpack.base.js');
var WebpackDevServer = require("webpack-dev-server");
var chalk = require('chalk');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ip = require('ip');


webpackConfig.entry = [
	'./src/index.js',
	'./index.html',
]

webpackConfig.entry = webpackConfig.entry.concat([
	'webpack-dev-server/client?http://localhost:8080',
])

webpackConfig.plugins = webpackConfig.plugins.concat([
	new HtmlWebpackPlugin({
		template: './index.html'
	}),
	new webpack.DefinePlugin({
		__DEV__:true,
		WEBGL_RENDERER:true,
		CANVAS_RENDERER:false,
	}),
])

// webpackConfig.devtool = 'cheap-module-eval-source-map';

var devServer = {
	publicPath: '/',
	contentBase: [
		'./',
		// '../'
	],
	disableHostCheck:true,
	stats: {
		colors: true,
		hash: true,
		version: true,
		timings: true,
		assets: false,
		chunks: false,
		modules: false,
		reasons: false,
		children: false,
		source: false,
		errors: true,
		errorDetails: true,
		warnings: false,
		publicPath: true
	}
}

var server = new WebpackDevServer(webpack(webpackConfig),devServer);
server.listen(8080, "127.0.0.1", function() {
	console.log(chalk.magenta("Starting server on: ")+chalk.magenta.bold("http://localhost:8080"));
	console.log(chalk.magenta("And on: ")+chalk.magenta.bold("http://"+ip.address()+":8080"));
});
