/*
 * File:    phaser-widget.js
 * Author:  Li XianJing <xianjimli@hotmail.com>
 * Brief:   wrap cantk element to PIXI sprite
 * 
 * Copyright (c) 2015 - 2016  Holaverse Inc.
 * 
 */
PIXI.Widget = function(game, x, y) {
	this.dirty = true;
	this.pointerDownPoint = {x:0, y:0};
	this.pointerLastPoint = {x:0, y:0};
	this.pointerUpPoint = {x:0, y:0};

    this.resolution = 1;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    var texture = PIXI.Texture.fromCanvas(this.canvas);
    texture.trim = new PIXI.Rectangle();
	this.hitArea = new PIXI.Rectangle();

    PIXI.Sprite.call(this, texture);
    this.position.set(x, y);
}

PIXI.Widget.create = function(game, cantkWidget, x, y) {
	var widget = new PIXI.Widget(game, x, y);
	widget.cantkWidget = cantkWidget;
	widget.name = cantkWidget.name;
	widget.enableInput();
	widget.hitArea.x = 0;
	widget.hitArea.y = 0;
	widget.hitArea.width = cantkWidget.width;
	widget.hitArea.height = cantkWidget.height;

	return widget;
}

PIXI.Widget.prototype = Object.create(PIXI.Sprite.prototype);
PIXI.Widget.prototype.constructor = PIXI.Widget;

PIXI.Widget.prototype.destroy = function (destroyBaseTexture) {
	this.canvas = null;
	this.context = null;
    this._texture.destroy(destroyBaseTexture === undefined ? true : destroyBaseTexture);
};

PIXI.Widget.prototype.updateCanvas = function() {
	if(this.cantkWidget) {
		var cantkWidget = this.cantkWidget;
		this.dirty = false;
		var x = cantkWidget.left;
		var y = cantkWidget.top;
		var w = cantkWidget.w;
		var h = cantkWidget.h;

		if(this.canvas.width !== w) {
			this.canvas.width = w;
		}
		if(this.canvas.height !== h) {
			this.canvas.height = h;
		}
		
		var ctx = this.context;
		ctx.clearRect(0, 0, w, h);
		ctx.now = Date.now();
		ctx.needRedraw = 0;
		ctx.translate(-x, -y);
		cantkWidget.paint(ctx);
		ctx.translate(x, y);
		this.updateTexture();
		if(ctx.needRedraw > 0) {
			this.dirty = true;
			ctx.needRedraw = 0;
		}

		return true;
	}

	return false;
}

PIXI.Widget.prototype.updateTexture = function () {
    var texture = this._texture;

    texture.baseTexture.hasLoaded = true;
    texture.baseTexture.resolution = this.resolution;

    texture.baseTexture.width = this.canvas.width;
    texture.baseTexture.height = this.canvas.height;
    texture.crop.width = texture._frame.width = this.canvas.width;
    texture.crop.height = texture._frame.height = this.canvas.height;

    texture.trim.x = 0;
    texture.trim.y = 0;

    texture.trim.width = texture._frame.width;
    texture.trim.height = texture._frame.height;

    this._width = this.canvas.width;
    this._height = this.canvas.height;

    texture.baseTexture.emit('update',  texture.baseTexture);
};

PIXI.Widget.prototype.updateTransform = function() {
	if (this.dirty)	 {
		this.updateCanvas();
	}

	PIXI.Sprite.prototype.updateTransform.call(this);
}

PIXI.Widget.prototype.isClicked = function() {
	return true;
}

PIXI.Widget.prototype.getCanvas2D = function() {
	return this.context;
}

PIXI.Widget.prototype.getScale = function() {
	return 1;
}

PIXI.Widget.prototype.getViewScale = function() {
	return 1;
}

PIXI.Widget.prototype.getAbsPosition = function() {
	return this.position;
}

PIXI.Widget.prototype.postRedrawAll = function() {
	this.dirty = true;

	return this;
}

PIXI.Widget.prototype.getMoveAbsDeltaX = function() {
	var dx = this.pointerLastPoint.x - this.pointerDownPoint.x;

	return dx;
}

PIXI.Widget.prototype.getMoveAbsDeltaY = function() {
	var dy = this.pointerLastPoint.y - this.pointerDownPoint.y;

	return dy;
}

PIXI.Widget.prototype.onPointerDown = function(pointer) {
	this.dirty = true;
	var point = pointer;
	this.pointerDown = true;
	this.pointerDownPoint.x = point.x;
	this.pointerDownPoint.y = point.y;
	this.pointerLastPoint.x = point.x;
	this.pointerLastPoint.y = point.y;
	this.cantkWidget.onPointerDown(point);

	return true;
}

PIXI.Widget.prototype.onPointerMove = function(pointer) {
	var point = pointer;
	this.pointerLastPoint.x = point.x;
	this.pointerLastPoint.y = point.y;
	this.cantkWidget.onPointerMove(point);
	this.postRedrawAll();
}

PIXI.Widget.prototype.onPointerUp = function(pointer) {
	this.dirty = true;
	var point = pointer;
	this.pointerDown = false;
	this.pointerUpPoint.x = point.x;
	this.pointerUpPoint.y = point.y;
	this.cantkWidget.onPointerUp(point);

	return true;
}

PIXI.Widget.prototype.touchmove = PIXI.Widget.prototype.mousemove = function(event) {
	var point = {x:0, y:0};
	var data = event.data;
	
	point.x = data.global.x;
	point.y = data.global.y;

	this.onPointerMove(point);

	return;
}

PIXI.Widget.prototype.mousedown = PIXI.Widget.prototype.touchstart = function(event) {
	var point = {x:0, y:0};
	var data = event.data;

	point.x = data.global.x;
	point.y = data.global.y;
	
	this.onPointerDown(point);

	return;
}

PIXI.Widget.prototype.mouseup = PIXI.Widget.prototype.touchend = PIXI.Widget.prototype.mouseupoutside = PIXI.Widget.prototype.touchendoutside = function(event) {
	var point = {x:0, y:0};
	var data = event.data;

	point.x = data.global.x;
	point.y = data.global.y;
	
	this.onPointerUp(point);

	return;
}

PIXI.Widget.prototype.enableInput = function(sprite, pointer) {
	this.interactive = true;
	
	return;
}
