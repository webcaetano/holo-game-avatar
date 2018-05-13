var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var main = require('./main');
var {scope,game,craft} = require('./main');

module.exports = function(){
	var state = {};

	state.init = function(gender='female'){
		scope = main.scope = require('./scope')(gender);
	}

	state.preload = function(){
		game.stage.disableVisibilityChange = false;
		game.stage.backgroundColor = '#fff';
		game.load.start();
	}

	state.create = function(){
		require('./game/layers')();
		require('./game/ui')();
		require('./game/controllers')();
		require('./game/events')();
		require('./game/colorPicker')();
		require('./game/body')();
		require('./game/partsBtns')();
		require('./game/colorBtns')();
		require('./game/arrows')();
		require('./game/methods')();
		require('./game/genders')();
		// require('./game/test')();

		scope.setPart('hair');

		scope.load();
	}

	return state;
}
