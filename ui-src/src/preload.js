var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var {game,craft} = require('./main');


var assets = {
	images:{
		// phaser:'images/phaser-dude.png'
	},
	sprites:{},
	audio:{},
	atlas:{
		avatar:{
			image:'texture_sheets/atlas.png',
			jsonUrl:'texture_sheets/atlas.json'
		},
		main:{
			image:'texture_sheets/misc.png',
			jsonUrl:'texture_sheets/misc.json'
		}
	}
}

module.exports = function(){
	var state = {};

	state.init = function(){
	}

	state.preload = function(){
		game.stage.disableVisibilityChange = false;
		game.stage.backgroundColor = '#fff';
		utils.loadAssets(game,assets);
		game.load.start();
	}

	state.create = function(){
		game.state.start('game');
	}

	return state;
}
