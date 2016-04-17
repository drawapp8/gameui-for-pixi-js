var game;
function gameStart() {	
	var renderer = PIXI.autoDetectRenderer(480, 854,{backgroundColor : 0x1099bb});
	document.body.appendChild(renderer.view);

	var stage = new PIXI.Container();

	game = {stage:stage, width:renderer.width, height:renderer.height};
	PIXI.CanTK.init(game, guiData);
	PIXI.CanTK.loadScene("win-main", 0, 0, stage.width, stage.height);
	
	animate();
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(stage);
	}
}

window.onload = gameStart();

