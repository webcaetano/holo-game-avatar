var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');

module.exports = function(){
	var {scope,game,craft,params} = require('./../main');
	var partsData = require('./partsData');

	var partBtns = scope.partBtns = craft.$g()
	.$set({
		x:210
	})
	.$into(scope.layers.top);
	var parts = ['skin','hair','eye','shoes','shirt','short','socks'];

	var createPartsBtn = function(){
		var partBtn = craft.$g().$into(partBtns);

		var bkg = partBtn.bkg = craft.$sprite('main','part_btn_01.png')
		.$into(partBtn);

		var icon = partBtn.icon = craft.$sprite('main','icons_01.png')
		.$set({
			x:11,
			y:13
		})
		.$into(partBtn);

		var label = partBtn.label = craft.$text("", {
			font: "12px 'Helvetica Neue', Helvetica, Arial, sans-serif"
		})
		.$set({
			x:0,
			y:70
		})
		.$into(partBtn);

		return partBtn;
	}

	partBtns.btns = _.map(parts,function(val,i){
		var btn = createPartsBtn()
		.$set({
			x:i*60,
			part:val
		});

		if(i>3) {
			btn.y = 75;
			btn.x = btn.x - 210;
		}

		btn.label.text = partsData[val].name;
		btn.label.x = Math.floor(btn.width/2)-Math.floor(btn.label.width/2);

		btn.icon.frameName = 'icons_'+_.padStart(partsData[val].icon+1,2,'0')+'.png';

		utils.setBtn(btn.bkg,function(e){
			// setPart(e.parent.part);
			scope.events.setPart.dispatch(val);
		});

		// partBtns[btn.part] = btn;
		// partBtns.add(btn);

		return btn;
	});

	partBtns.setBtn = function(part){
		_.each(partBtns.btns,function(btn){
			btn.bkg.frameName = (btn.part==part ? 'part_btn_02.png' : 'part_btn_01.png');
		});
	}

	return partBtns;
}
