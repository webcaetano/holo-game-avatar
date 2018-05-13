var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');
var colorPickerCells = require('./colorPickerCells');

module.exports = function(){
	var {scope,game,craft,params} = require('./../main');

	var self = scope.colorsBtns = craft.$g()
	.$set({
		x:255,
		y:175,
	})
	.$into(scope.layers.top);

	var createColorBtn = function(){
		var btn = craft.$g().$into(self);

		var bkg = btn.bkg = craft.$sprite('main','color_btn_01.png')
		.$into(btn);

		var sel = btn.sel = craft.$sprite('main','color_btn_02.png')
		.$set({
			visible:false,
		})
		.$into(btn);

		var label = btn.label = craft.$text("", {
			font: "12px 'Helvetica Neue', Helvetica, Arial, sans-serif"
		})
		.$set({
			x:12,
			y:46,
		})
		.$into(btn);

		return btn;
	}

	self.btns = _.times(3,function(i){
		var btn = createColorBtn();
		btn.x = i*60;
		btn.label.text = 'Color '+(i+1);
		btn.sel.visible = false;
		btn.n = i+1;
		btn.label.x = Math.floor(btn.width/2)-Math.floor(btn.label.width/2);
		utils.setBtn(btn.bkg,function(){
			self.setColorSel(i);
			scope.events.setColorSel.dispatch(i+1);
		});

		return btn;
	});

	self.refresh = function(){
		_.each(self.btns,function(btn,i){
			if(!scope.parts[scope.selPart] || scope.parts[scope.selPart].colors[i]===undefined) return true;
			btn.bkg.$tint('#'+colorPickerCells[scope.parts[scope.selPart].colors[i]].color);
		});
	}

	self.setVisible = function(part,frame){
		var layers = scope.getLayersNumInFrame(part,frame);

		_.each(self.btns,function(btn,i){
			btn.visible = i<layers;
		})
	}

	self.setColorSel = function(nColor){
		scope.selColor = nColor;

		_.each(self.btns,function(btn,i){
			btn.sel.visible = i==nColor;
		})

	}
}
