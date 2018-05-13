var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');

module.exports = function(){
	var {scope,game,craft,params} = require('./../main');

	var self = scope.ui = {};

	self.text = function(text,options){
		var defaults = {
			size:20,
			color:'#FFFFFF',
			borderColor:'#161616',
			borderSize:10,
			align:'center',
			bold:false,
			font:"nexa",
			gap:3,
		}

		options = _.extend({},defaults,options);

		var txt = craft.$g();

		txt.front = game.add.text(0, 0, text, {
			font: (options.bold ? 'bold' : '')+" "+options.size+"px "+options.font+", Helvetica, Arial, sans-serif",
			align:'center',
			fill:options.borderColor,
			stroke:options.borderColor,
			strokeThickness:options.borderSize+2,
		});

		txt.bkg = game.add.text(0, 0, text, {
			font: (options.bold ? 'bold' : '')+" "+options.size+"px "+options.font+", Helvetica, Arial, sans-serif",
			align:'center',
			fill:options.color,
			stroke:options.borderColor,
			strokeThickness:options.borderSize,
		});

		txt.setText = function(text){
			txt.front.text = txt.bkg.text = text;

			if(options.align=='center') txt.front.x = -txt.front.width*0.5;
			txt.front.y = -txt.front.height*0.5;

			txt.bkg.x = txt.front.x;
			txt.bkg.y = txt.front.y+options.gap;
		}

		if(options.align=='center') txt.front.x = -txt.front.width*0.5;
		txt.front.y = -txt.front.height*0.5;
		txt.bkg.x = txt.front.x;
		txt.bkg.y = txt.front.y+options.gap;
		txt.add(txt.front);
		txt.add(txt.bkg);

		return txt;
	}


	self.btn = function(txt='test',size=100){
		var btn = craft.$g();

		var left = craft.$sprite('main','btn_green/1.png')
		.$into(btn);

		var mid = craft.$sprite('main','btn_green/2.png')
		.$set({
			x:left.width,
			width:size,
		})
		.$into(btn);

		var right = craft.$sprite('main','btn_green/3.png')
		.$set({
			x:left.width+mid.width,
		})
		.$into(btn);

		var area = btn.area = craft.$rect({
			width:btn.width,
			height:btn.height
		})
		.$set({
			alpha:0,
		})
		.$into(btn)

		var label = craft.$text(txt,{
			size:16,
			bold:true,
		})
		.$set({
			y:5,
		})
		.$into(btn);

		label.x = (btn.width/2)-(label.width/2)

		return btn;
	}
}
