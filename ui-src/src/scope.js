var _ = require('lodash');
var Phaser = require('phaser');
var utils = require('utils');

module.exports = function(gender='female'){
	var {scope,game,craft} = require('./main');

	var scope = {
		gender,
		active:true,
		parts:{},
		selColor:0,
		_default:null,
		selPart:'hair',
	};

	return scope;
}
