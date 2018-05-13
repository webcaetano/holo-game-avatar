var utils = require('utils');
var _ = require('lodash');
var Phaser = require('phaser');
var main = require('./main');
var {scope,game,craft} = require('./main');

module.exports = function(){
	var state = {};

	state.init = function(gender='female',_default=null){
		scope = main.scope = require('./scope')(gender);
		scope._default = _default;
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

		if(scope._default){
			scope.load(scope._default);
			scope._default = null;
		} else {
			scope.load();
		}
	}

	return state;
}
