function gameStart() {
	// the second parameter is interactivity...
	var interactive = true;
	var stage = new PIXI.Stage(0x000000, interactive);

	// create a renderer instance.
	var renderer = PIXI.autoDetectRenderer(480, 800);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);
	
	GameUI.init(PIXI, stage, guiData, renderer.view);

	requestAnimFrame(animate);

	// create a background..
	var background = PIXI.Sprite.fromImage("bg.jpg");

	// add background to stage...
	stage.addChild(background);

	loadScene("win-main");

	function animate() {
	    // render the stage
	    renderer.render(stage);

	    requestAnimFrame(animate);	    
	}

	// add a logo!
	var pixiLogo = PIXI.Sprite.fromImage("pixi.png");
	stage.addChild(pixiLogo);

	pixiLogo.buttonMode = true;
	pixiLogo.position.x = renderer.view.width - 56;
	pixiLogo.position.y = 0;

	pixiLogo.click = pixiLogo.tap = function() {
		window.open("http://www.pixijs.com", '_blank');
	};
}

window.onload = gameStart;

