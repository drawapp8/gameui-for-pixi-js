var game;
var choosedLabel;
function gameStart() {	
	var renderer = PIXI.autoDetectRenderer(480, 854,{backgroundColor : 0x1099bb});
	document.body.appendChild(renderer.view);

	// create the root of the scene graph
	var stage = new PIXI.Container();

	game = {stage:stage, width:renderer.width, height:renderer.height};
	PIXI.CanTK.init(game, guiData);
	var sprite = PIXI.Sprite.fromImage('assets/bunny.png');
	
	var sprite = new PIXI.Text('Open Dialog',{fill : '#555555', font : '32px Arial'});
	sprite.position.set(240, 200);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.interactive = true;
	sprite.on('click', onOpenDialog);
	sprite.on('tap', onOpenDialog);
	stage.addChild(sprite);
	
	sprite = new PIXI.Text('Open Window',{fill : '#555555', font : '32px Arial'});
	sprite.position.set(240, 300);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.interactive = true;
	sprite.on('click', onOpenWindow);
	sprite.on('tap', onOpenWindow);
	stage.addChild(sprite);

	sprite = new PIXI.Text('Choose',{fill : '#555555', font : '32px Arial'});
	sprite.position.set(240, 400);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.interactive = true;
	sprite.on('click', onOpenDialog2);
	sprite.on('tap', onOpenDialog2);
	stage.addChild(sprite);

	sprite = new PIXI.Text('Not Choose',{fill : '#555555', font : '32px Arial'});
	sprite.position.set(0, renderer.height-30);
	sprite.anchor.x = 0;
	sprite.anchor.y = 0.5;
	stage.addChild(sprite);
	choosedLabel = sprite;

	animate();
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(stage);
	}
}

window.onload = gameStart();

function onOpenDialog(button, pointer, isOver) {
	PIXI.CanTK.openWindow("dialog", 0, 0, game.width, game.height);
}

function onOpenDialog2(button, pointer, isOver) {
	function onReturn(ret) {
		choosedLabel.setText("You Choosed " + ret);
	}
	PIXI.CanTK.openWindow("selectorDialog", 0, game.height-300, game.width, 300, onReturn);
}

function onOpenWindow(button, pointer, isOver) {
	PIXI.CanTK.openWindow("scene", 0, 0, game.width, game.height);
}
