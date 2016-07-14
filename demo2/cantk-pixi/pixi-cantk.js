/*
 * File:    pixi-cantk.js
 * Author:  Li XianJing <xianjimli@hotmail.com>
 * Brief:   cantk for pixi
 * 
 * Copyright (c) 2015 - 2016  Holaverse Inc.
 * 
 */

PIXI.CanTK = {};
PIXI.CanTK.App = {};
PIXI.CanTK.wins = [];

UIWindowManager.soundMusic = {};
UIWindowManager.soundEffects = {};
		
PIXI.CanTK.init = function(game, uiData) {
	PIXI.CanTK.game = game;
	PIXI.CanTK.uiData = uiData;
	PIXI.Widget.setMeta(uiData.meta);

	var wmData = PIXI.CanTK.uiData.wm;
	wmData.images = {};
	var wm = CanTK.createElementWithJson(wmData);
	wm.setSize(game.width, game.height);
	wm.relayout();
	wm.setApp(PIXI.CanTK.App);
	wm.setView(PIXI.Widget.create(game, wm, 0, 0));

	PIXI.CanTK.wm = wm;
	wm.openWindowOrg = wm.openWindow;
	wm.openWindow = function(name, onClose, closeCurrent, initData, options) {
		this.openWindowOrg(name, onClose, closeCurrent, initData, options);
		
		var win = wm.find(name);
		var widget = PIXI.Widget.create(game, win, win.x, win.y);
		win.setView(widget);
		game.stage.addChild(widget);

		win.addEventListener("close", function() {
			game.stage.removeChild(widget);
			PIXI.CanTK.wins.pop();
			PIXI.CanTK.redrawWindows();
		});
		win.postRedraw();
		PIXI.CanTK.wins.push(win);

		return widget;
	}

	wm.loadAssets();
	wm.loadAudios();

	return;
}

PIXI.CanTK.redrawWindows = function() {
	PIXI.CanTK.wins.forEach(function(win) {
		win.postRedraw();
	});
}

PIXI.CanTK.getWindowInputPriority = function() {
	return 10 + PIXI.CanTK.wins.length;
}

PIXI.CanTK.createWidgetsForScene = function(name, onWidgetCreated) {
	var wm = PIXI.CanTK.wm;
	var win = wm.find(name);
	var game = PIXI.CanTK.game;

	if(win) {
		win.fromJsonNow(win.jsonData);
		var arr = win.children;
		for(var i = 0; i < arr.length; i++) {
			var iter = arr[i];
			var widget = PIXI.Widget.create(game, iter, iter.left, iter.top);
			iter.setView(widget);
			if(onWidgetCreated) {
				onWidgetCreated(widget);
			}
			game.stage.addChild(widget);
		}
		win.children = [];
	}
}

PIXI.CanTK.loadScene = function(name, onLoadDone, onWidgetCreated) {
	var wm = PIXI.CanTK.wm;
	var win = wm.find(name);
	wm.loadAssets(name, function(percent, finished, total) {
		if(percent >= 100) {
			PIXI.CanTK.createWidgetsForScene(name, onWidgetCreated);	
			if(onLoadDone) {
				onLoadDone();
			}
		}
	});
}

PIXI.CanTK.openWindow = function(name, x, y, w, h, onWindowClose, initData) {
	var wm = PIXI.CanTK.wm;
	var win = wm.find(name);
	if(win) {
		win.x = x;
		win.y = y;
		win.w = w;
		win.h = h;

		wm.openWindow(name, onWindowClose, false, initData);

		return win.view;
	}

	return null;
}

PIXI.CanTK.isMobile = isMobile;
PIXI.CanTK.getViewPort = cantkGetViewPort;
PIXI.CanTK.initViewPort = cantkInitViewPort;

