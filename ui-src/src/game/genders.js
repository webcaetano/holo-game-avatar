var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');

module.exports = function(){
	var {scope,game,craft,params} = require('./../main');
	var gap = 60;

	var self = craft.$g()
	.$set({
		x:80,
		y:game.height-40
	});

	_.each([
		{
			name:'Type 1',
			x:-gap,
		},
		{
			name:'Type 2',
			x:gap,
		}
	],function(val){
		var btn = scope.ui.btn(val.name)
		.$set({
			x:val.x
		})
		.$into(self);

		utils.setBtn(btn.area,function(){
			game.state.restart(true,false,_.toLower(val.name));
		})
	})
}
