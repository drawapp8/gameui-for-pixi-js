function gameStart() {	
	var renderer = PIXI.autoDetectRenderer(480, 854,{backgroundColor : 0x1099bb});
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

