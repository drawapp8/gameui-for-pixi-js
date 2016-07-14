function initRenderer(w, h) {
	var renderer = PIXI.autoDetectRenderer(w, h, {backgroundColor : 0x1099bb});
	document.body.appendChild(renderer.view);
	
	if(PIXI.CanTK.isMobile()) {
		PIXI.CanTK.initViewPort();
		var viewPort = PIXI.CanTK.getViewPort();
		renderer.view.style.width = viewPort.width + "px";
		renderer.view.style.height = viewPort.width * renderer.height/renderer.width + "px";
	}

	return renderer;
}


function gameStart() {	
	var renderer = initRenderer(480, 854);
	var stage = new PIXI.Container();
	var game = {stage:stage, width:renderer.width, height:renderer.height};

	PIXI.CanTK.init(game, guiData);

	PIXI.CanTK.loadScene("win-main", function() {
		console.log("load done");
	}, function(widget) {
		console.log("create " + widget.name);
	});
	
	animate();
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(stage);
	}
}

window.onload = gameStart();

