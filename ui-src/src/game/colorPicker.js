var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');
var colorPickerCells = require('./colorPickerCells');

module.exports = function(){
	var {scope,game,craft,params} = require('./../main');
	var partsData = require('./partsData');

	var self = scope.colorPicker = craft.$g()
	.$set({
		x:230,
		y:240,
	})
	.$into(scope.layers.top);

	scope.colorPicker.cells = _.map(colorPickerCells,function(val,i){
		var sprite = craft.$sprite('main','colorCell.png')
		.$set({
			x:val.x,
			y:val.y,
			name:i,
			zone:val.z,
		})
		.$tint('#'+val.color)
		.$into(scope.colorPicker);

		utils.setBtn(sprite,function(){
			scope.events.colorClick.dispatch('#'+val.color,i);
		});

		sprite.input.pixelPerfectAlpha = true;
		sprite.input.pixelPerfectClick = true;

		return sprite;
	});

	self.showZone = function(part){
		var partData = partsData[part];
		_.each(self.cells,function(cell){
			cell.visible = !_.includes(partData.banZ,cell.zone);
		});
	}
}
