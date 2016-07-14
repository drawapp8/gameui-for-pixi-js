
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
	document.body.appendChild(renderer.view);

	// create the root of the scene graph
	var stage = new PIXI.Container();

	var sprite = PIXI.Sprite.fromImage('assets/bunny.png');
	sprite.position.set(230,264);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.interactive = true;
	sprite.on('click', onDown);
	sprite.on('tap', onDown);

	stage.addChild(sprite);

	// scale the sprite up every time it is clicked/touched
	function onDown (eventData) {
	}
	
	animate();
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(stage);
	}
}

window.onload = gameStart();

