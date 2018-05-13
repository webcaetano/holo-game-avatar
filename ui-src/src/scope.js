var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');

module.exports = function(gender='female'){
	var {scope,game,craft} = require('./main');

	var scope = {
		active:true,
		parts:{},
		selColor:0,
		selPart:'hair',
		gender:gender
	};

	return scope;
}
