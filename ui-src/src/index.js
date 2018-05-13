var Phaser = require('phaser');
var main = require('./main');
// var pkg = require('./pkg.json');

// console.log('%c '+pkg.name+' v'+pkg.version+' ', 'background: #002874; color: #ffffff');

var setup = {
	options:{
		width:470,
		height:440,
		where:'master-canvas'
	},
}

// require('./modules/stats')();

var game = main.game = new Phaser.Game(
	setup.options.width,
	setup.options.height,
	Phaser.CANVAS,
	setup.options.where,
	null,
);

main.craft = require('phaser-craft')(game);

game.state.add('preload', require('./preload'));
game.state.add('game', require('./game'));

game.state.start('preload');
