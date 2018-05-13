var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');
var colorPickerCells = require('./colorPickerCells');

module.exports = function(){
	var {scope,game,craft,params} = require('./../main');
	var partsData = require('./partsData');

	var defaults = {
		female:{"skin":{"colors":["194","63","63"],"style":0},"shirt":{"colors":["67","140","63"],"style":6},"short":{"colors":["140","67","63"],"style":1},"socks":{"colors":["140","67","63"],"style":3},"shoes":{"colors":["67","63","63"],"style":1},"hair":{"colors":["67","63","63"],"style":3},"eyeBkg":{"colors":["63","63","63"],"style":0},"eye":{"colors":["96","63","63"],"style":0}},
		male:{"skin":{"colors":["194","63","63"],"style":0},"shirt":{"colors":["184","63","63"],"style":2},"short":{"colors":["184","63","63"],"style":3},"socks":{"colors":["184","63","63"],"style":5},"shoes":{"colors":["63","184","63"],"style":4},"hair":{"colors":["121","63","63"],"style":0},"eyeBkg":{"colors":["63","63","63"],"style":0},"eye":{"colors":["62","63","63"],"style":0}}
	}

	scope.setFramePart = function(part,frame){
		var partData = partsData[part];

		if(!partData.layers){
			scope.avatar[part].layers[0].visible = true;
			scope.avatar[part].layers[0].frameName = scope.gender+'/'+part+'/'+(frame+1)+'.png';
		} else {
			_.each(partData.layers,function(layerData,i){
				var tmpFrame = (typeof layerData=='number' ? layerData-1 : layerData[frame]-1);
				if(tmpFrame==-1){
					scope.avatar[part].layers[i].visible = false;
				} else {
					scope.avatar[part].layers[i].visible = true;
					scope.avatar[part].layers[i].frameName = scope.gender+'/'+part+'/'+(tmpFrame+1)+'.png';
				}
			})
		}


		scope.avatar[part].f = frame;
		scope.parts[part].style = frame;

		if(partData.link) scope.setFramePart(partData.link,frame);
	}

	scope.getLayersNumInFrame = function(part,frame){
		var partData = partsData[part];

		if(!partData.layers){
			return 1;
		} else {
			var layers = 0;
			_.times(partData.layers.length,function(i){
				var tmpFrame = (typeof partData.layers[i]=='number' ? partData.layers[i]-1 : partData.layers[i][frame]-1);
				if(tmpFrame==-1){
					return;
				} else {
					layers++;
				}
			});
			return layers;
		}
	}

	var getPartFrameLength = function(part){
		var partData = partsData[part];
		if(partData && !partData.layers){
			return partData.frames;
		} else {
			var max = 0;
			_.times(partData.layers ? partData.layers.length : 1,function(i){
				var tmpFrame = (typeof partData.layers[i]=='number' ? 1 : partData.layers[i].length);
				if(tmpFrame>max) max=tmpFrame;
			});
			return max;
		}
	}

	scope.setPart = function(part){
		var partData = partsData[part];

		scope.colorPicker.showZone(part);
		scope.partBtns.setBtn(part);

		scope.arrows.left.visible = scope.arrows.right.visible = !!partData.arrows;

		if(!!partData.arrows){
			scope.arrows.left.x = partData.arrows[scope.gender][0][0];
			scope.arrows.left.y = partData.arrows[scope.gender][0][1];
			scope.arrows.right.x = partData.arrows[scope.gender][1][0];
			scope.arrows.right.y = partData.arrows[scope.gender][1][1];
		}

		scope.selPart = part;
		scope.colorsBtns.refresh();
		scope.colorsBtns.setVisible(scope.selPart,scope.avatar[scope.selPart].f);
		scope.colorsBtns.setColorSel(0);
		scope.setFramePart(part,scope.avatar[part].f)
	}


	scope.changeStyle = function(next=true){
		var part = scope.selPart;
		var max = getPartFrameLength(part);

		if(next){
			var frame = scope.avatar[part].f+1>=max ? 0 : scope.avatar[part].f+1;
		} else {
			var frame = scope.avatar[part].f-1<0 ? max-1 : scope.avatar[part].f-1;
		}

		scope.setFramePart(part, frame);
		scope.colorsBtns.setVisible(part,frame);
	}

	scope.load = function(_data){
		if(_data){
			var data = _data;
		} else {
			var data = defaults[scope.gender];
		}

		_.each(data,function(part,i){
			scope.setFramePart(i,part.style);
			_.each(part.colors,function(color,c){
				if(!scope.avatar[i] || !scope.avatar[i].layers[c]) return true;
				scope.avatar[i].layers[c].$tint('#'+colorPickerCells[color].color);
				scope.parts[i].colors[c] = color;
				scope.parts[i].style = part.style;
			});
		});

		scope.colorsBtns.refresh();
	}

	$("#saveButton").click(function(){
		var _message = scope.parts;
		var message = JSON.stringify(_message)
		// $.post('/fn/readerWriter/holoTextWrite',message,function(data){
		// 	$('#hash').val(data);
		// });
	});

	$("#loadButton").click(function(){
		// $.post('/fn/readerWriter/holoTextRead',$('#load').val(),function(_data){
		// 	var data = $.parseJSON(_data);
		// 	scope.load(data);
		// });
	});
}
