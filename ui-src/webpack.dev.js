var webpack = require("webpack");
var webpackConfig = require('./webpack.base.js');
var WebpackDevServer = require("webpack-dev-server");
var chalk = require('chalk');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ip = require('ip');

var port = 3000;

webpackConfig.entry = [
	'./src/index.js',
	'./index.html',
]

webpackConfig.entry = webpackConfig.entry.concat([
	'webpack-dev-server/client?http://localhost:'+port,
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
	},
	proxy: {
		'/fn': {
			target: {
				host: 'localhost',
				protocol: 'http',
				port: 4141
			},
			secure: false,
			bypass: function (req, res, proxyOptions) {
				console.info(req.method + req.originalUrl)
				if (req.method === 'OPTIONS') {
				  res.statusCode = 200
				  return 'a' // I don't know the purpose of this line, but indeed it works
				}
			}
		}
	},
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Max-Age': '3600',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    }
}

var server = new WebpackDevServer(webpack(webpackConfig),devServer);
server.listen(port, "127.0.0.1", function() {
	console.log(chalk.magenta("Starting server on: ")+chalk.magenta.bold("http://localhost:"+port));
	console.log(chalk.magenta("And on: ")+chalk.magenta.bold("http://"+ip.address()+":"+port));
});
