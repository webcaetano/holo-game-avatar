var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');

module.exports = function(){
	var {scope,game,craft,params} = require('./../main');

	scope.arrows = _.transform([
		{
			x:1,
			name:'left',
			val:false,
		},
		{
			name:'right',
			x:-1,
			val:true,
		}
	],function(resp,val,i){
		var btn = resp[val.name] = craft.$sprite('main','arrow.png')
		.$into(scope.layers.top);

		btn.scale.x = val.x;
		utils.setBtn(btn,function(){
			scope.events.changeStyle.dispatch(val.val)
		});

		return resp;
	},{})
}
