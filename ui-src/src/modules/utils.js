var self = {};

self.randInRange = function(point,range){
	var a = (Math.random()*360) * (Math.PI / 180);
	var d = Math.random()*range*0.5;
	return {
		x:point.x + Math.cos(a) * d,
		y:point.y + Math.sin(a) * d
	}
}

self.mod = function(n,a){
	return ((n % a) + a) % a;
}

self.angleBetween = function(point1,point2){
	return Math.atan2(point2.y-point1.y, point2.x-point1.x);
}

self.angleBetweenRad = function(point1,point2){
	return Math.atan2(point2.y-point1.y, point2.x-point1.x)*(180/Math.PI);
}

self.radPos = function(point,angle,range){
	var a = angle * (Math.PI / 180);
	return {
		x:point.x + (Math.cos(a) * range),
		y:point.y + (Math.sin(a) * range)
	}
}

self.dist = function(obj1,obj2){
	return Math.sqrt(Math.pow(obj1.x-obj2.x,2)+Math.pow(obj1.y-obj2.y,2));
}

self.setBtn = function(obj,callback){
	if(callback===undefined) callback=null;
	if(!obj) return;
	if(!obj.inputEnabled) obj.inputEnabled = true;
	if(!obj.input) return;
	obj.input.useHandCursor = true;
	if(callback){
		obj.events.onInputUp.add(function(e){
			callback(e);
		});
	}
	return obj;
}

self.setBtnHold = function(obj,callback,callback2){
	if(callback===undefined) callback=null;
	if(!obj) return;
	if(!obj.inputEnabled) obj.inputEnabled = true;
	if(!obj.input) return;
	obj.input.useHandCursor = true;

	if(callback){
		obj.events.onInputDown.add(function(e){
			callback(e);
		});
	}
	if(callback2){
		obj.events.onInputUp.add(function(e){
			callback2(e);
		});
	}
	return obj;
}


self.loadAssets = function(game,assets){
	var i;
	for(i in assets.atlas) {
		game.load.atlasJSONHash(i, assets.atlas[i].image, assets.atlas[i].jsonUrl, assets.atlas[i].json);
	}
	for(i in assets.images) game.load.image(i, assets.images[i]);
	for(i in assets.sprites) game.load.spritesheet(i, assets.sprites[i].image, assets.sprites[i].width, assets.sprites[i].height, assets.sprites[i].frames);
	for(i in assets.audio) game.load.audio(i, assets.audio[i]);
}


self.setHover = function(obj,callback,callback2){
	if(callback===undefined) callback=null;
	if(callback2===undefined) callback2=null;

	if(!obj) return;
	if(!obj.inputEnabled) obj.inputEnabled = true;
	if(!obj.input) return;
	obj.input.useHandCursor = true;
	if(callback){
		obj.events.onInputOver.add(function(e){
			callback(e);
		});
	}
	if(callback2){
		obj.events.onInputOut.add(function(e){
			callback2(e);
		});
	}
	return obj;
}

self.isEven = function(val){
	return val % 2 == 0;
};

self.isOdd = function(val){
	return !!(val % 2);
};

module.exports = self;
