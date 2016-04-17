[Hola Cantk](https://github.com/drawapp8/cantk/)是一个功能强大的游戏引擎，它拥有丰富的GUI控件，配合[Hola Studio](http://studio.holaverse.com/)可以快速开发出游戏的UI界面。[PIXI](https://github.com/pixijs/pixi.js)是一个流行而且强大的游戏引擎，但是它的GUI控件很少，而且缺乏界面编辑器，导出开发游戏UI界面比较低效。gameui-for-pixi-js就是为了发挥两者的长处，让你可以用[Hola Studio](http://studio.holaverse.com/)UI界面，用[PIXI](https://github.com/pixijs/pixi.js)开发游戏，然后把两者无缝结合起来。

集成到PIXI项目
=====================================
1.创建PIXI项目。

2.把本项目的gameui目录中的文件拷贝到PIXI项目中。

3.用[Hola Studio](http://studio.holaverse.com/)创建游戏的UI。

4.在Hola Studio的文件菜单中导出『HTML文件』。

5.把导出的zip文件中的myapp.js，assets目录拷贝到PIXI项目。

6.在index.html中添加下列脚本：
```
    <script src="myapp.js"></script>
    <script src="cantk-pixi/cantk-core.js"></script>
    <script src="cantk-pixi/pixi-widget.js"></script>
    <script src="cantk-pixi/pixi-cantk.js"></script>
```

7.初始化。
```	
	var game = {stage:stage, width:renderer.width, height:renderer.height};
	PIXI.CanTK.init(game, guiData);
```

8.打开窗口。
```	
	PIXI.CanTK.openWindow("dialog", 0, 0, game.width, game.height, function(retInfo) {
		console.log("dialog closed, and return " + retInfo);
	});
```
