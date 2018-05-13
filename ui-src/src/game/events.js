var _ = require('lodash');
var Phaser = require('phaser');

module.exports = function(){
	var {scope,game,craft} = require('./../main');
	var self = scope.events = _.transform([
		'start',
		'colorClick',
		'setColorSel',
		'changeStyle',
		'setPart',
	],function(resp,val,i){
		resp[val] = new Phaser.Signal;
	},{});

	self.start.add(function(){
	});

	self.colorClick.add(function(color,id){
		// console.log(color,id,scope.selColor,scope.selPart)
		scope.avatar[scope.selPart].layers[scope.selColor].$tint(color);
		scope.colorsBtns.btns[scope.selColor].bkg.$tint(color);
		scope.parts[scope.selPart].colors[scope.selColor] = id;
	})

	self.setPart.add(function(part){
		scope.setPart(part);
	})

	self.setColorSel.add(function(colorSelInd){
		// scope.selColor = colorSelInd;
	})

	self.changeStyle.add(function(val){
		scope.changeStyle(val);
	})
}
