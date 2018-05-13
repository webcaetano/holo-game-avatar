var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');

module.exports = function(){
	var {scope,game,craft,params} = require('./../main');
	var partsData = require('./partsData');

	var genders = {
		male:{x:30,y:0},
		female:{x:0,y:0}
	}

	var self = scope.avatar = craft.$g()
	.$set(genders[scope.gender])
	.$into(scope.layers.mid);

	var sizes = {
		origin:{
			male:{width:300,height:786},
			female:{width:438,height:750}
		},
		normal:{
			male:{width:150,height:393},
			female:{width:219,height:375}
		},
		md:{
			male:{width:120,height:314},
			female:{width:175,height:300}
		},
		sm:{
			male:{width:90,height:236},
			female:{width:131,height:224}
		},
		xs:{
			male:{width:45,height:118},
			female:{width:66,height:113}
		}
	};



	_.each(partsData,function(val,i){
		// parts[i].colors = ['63','63','63'];
		// desk.avatar[options.gender][i]=[];
		self[i] = craft.$g()
		.$set({
			f:0,
		})
		.$into(self);

		scope.parts[i] = {
			colors:['63','63','63']
		}

		self[i].layers = _.times(val.layers ? val.layers.length : 1,function(k){
			// desk.avatar[options.gender].create(0,0,'avatar',)
			var sprite = craft.$sprite('avatar',scope.gender+'/'+i+'/1.png')
			.$set({
				x:0,
				y:0,
			})
			.$into(self[i]);

			return sprite;
		})

		// setFramePart(i,0)
	})

	// game.time.events.loop(7000,function(){
	// 	var data = {
	// 	};

	// 	_.each(scope.parts,function(val,i){
	// 		if(!val.colors) return true;
	// 		data[i] = {
	// 			colors:val.colors,
	// 			style:scope.avatar[i].f
	// 		}
	// 	});

	// 	console.clear();
	// 	console.log(JSON.stringify(data))
	// })
}
