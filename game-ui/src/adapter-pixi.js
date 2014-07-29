var Adapter = {};

Adapter.init = function() {
	Adapter.engine = window.PIXI ? window.PIXI : game;

	Adapter.loadAssets = function(srcs) {
		var mediaFolder = game.config.mediaFolder;
		game.config.mediaFolder = "";

		for(var i = 0; i < srcs.length; i++) {
			game.addAsset(srcs[i]);	
		}

		game.config.mediaFolder = mediaFolder;

		return;
	}
	
	Adapter.createTextureFromCanvas = function(canvas) {
		return Adapter.engine.Texture.fromCanvas(canvas)
	}

	Adapter.createSpriteFromImage = function(src, x, y, w, h) {
		var sprite = Adapter.engine.Sprite.fromImage(src);

		sprite.x = x;
		sprite.y = y;
		sprite.width = w;
		sprite.height = h;
		
		sprite.setVisible = function(visible) {
			this.visible = visible;

			return;
		}

		sprite.isVisible = function() {
			return this.visible;
		}

		return sprite;
	}
	
	Adapter.createTextureFromImage = function (src) {
		return Adapter.engine.Texture.fromImage(src);
	}
	
	Adapter.setTexture = function(sprite, texture) {
		sprite.setTexture(texture);

		return;
	}
	
	Adapter.setBeforePaintCallback= function(sprite, onBeforePaint) {
		sprite.orgUpdateTransform = sprite.updateTransform;
		sprite.updateTransform = function() {
			if(this.isVisible()) {
				onBeforePaint.call(this);
				this.orgUpdateTransform();
			}

			return;
		}

		return;
	}

	Adapter.createSprite = function(texture, x, y, w, h) {
		if(texture instanceof HTMLCanvasElement) {
			texture = Adapter.createTextureFromCanvas(texture);
		}
		else if(texture instanceof HTMLImageElement) {
			texture = Adapter.createTextureFromImage(texture);
		}

		var sprite = new Adapter.engine.Sprite(texture);
	
		sprite.getAbsPosition = function() {
			var point = {};

			var pos = GameUI.getHTMLElementPosition(GameUI.view);
			point.x = this.getX() + pos.left;
			point.y = this.getY() + pos.top;

			return point;
		}
		
		sprite.getViewScale = function() {
			var canvas = GameUI.view;

			var realWidth = parseInt(canvas.style.width);
			var scale = realWidth/canvas.width;

			return scale;
		}

		sprite.getX = function() {
			return this.x;
		}
		
		sprite.setX = function(x) {
			this.x = x;

			return;
		}
		
		sprite.getY = function() {
			return this.y;
		}
		
		sprite.setY = function(y) {
			this.y = y;

			return;
		}
		
		sprite.getAnchorX = function() {
			return this.anchor.x;
		}
		
		sprite.setAnchorX = function(anchorX) {
			this.anchor.x = anchorX;

			return;
		}
		
		sprite.getAnchorY = function() {
			return this.anchor.y;
		}
		
		sprite.setAnchorY = function(anchorY) {
			this.anchor.y = anchorY;

			return;
		}

		sprite.getPivotX = function() {
			return this.pivot.x;
		}
		
		sprite.setPivotX = function(pivotX) {
			this.pivot.x = pivotX;

			return;
		}
		
		sprite.getPivotY = function() {
			return this.pivot.y;
		}
		
		sprite.setPivotY = function(pivotY) {
			this.pivot.y = pivotY;

			return;
		}
		
		sprite.getScale = function() {
			return this.scale;
		}
		
		sprite.setScale = function(scale) {
			this.scale.x = scale;
			this.scale.y = scale;

			return;
		}
		
		sprite.getAlpha = function() {
			return this.alpha;
		}
		
		sprite.setAlpha = function(alpha) {
			this.alpha = alpha;

			return;
		}
		
		sprite.rotationFromRadian = function(radian) {
			return radian;
		}

		sprite.getRotation = function() {
			return this.rotation;
		}
		
		sprite.setRotation = function(rotation) {
			this.rotation = rotation;

			return;
		}

		sprite.setVisible = function(visible) {
			this.visible = visible;

			return;
		}

		sprite.isVisible = function() {
			return this.visible;
		}

		sprite.movePivotToCenter = function() {
			var pivotX = sprite.getWidth() >> 1;
			var pivotY = sprite.getHeight() >> 1;
			
			var x = sprite.getX() + pivotX;
			var y = sprite.getY() + pivotY;

			this.setPivotX(pivotX);
			this.setPivotY(pivotY);

			this.setX(x);
			this.setY(y);

			return;
		}

		sprite.enableInput = function() {
			this.interactive = true;

			return true;
		}

		sprite.orgUpdateTransform= sprite.updateTransform;
		sprite.updateTransform = function() {
			if(this.isVisible()) {
				this.updateWidgetIfDirty();
				this.orgUpdateTransform();
			}

			return;
		}

		sprite.updateTexture = function() {
			this.texture.baseTexture.width = this.canvas.width;
			this.texture.baseTexture.height = this.canvas.height;
			this.texture.baseTexture.source = this.canvas;
			this.texture.frame.width = this.canvas.width;
			this.texture.frame.height = this.canvas.height;

			this._width = this.canvas.width;
			this._height = this.canvas.height;

			this.requiresUpdate =  true;
		};

		sprite._renderWebGL = Adapter.engine.Text.prototype._renderWebGL;
		sprite.touchmove = sprite.mousemove = function(data) {
			var point = {x:0, y:0};
			
			point.x = data.global.x - this.position.x;
			point.y = data.global.y - this.position.y;

			this.handlePointerMove(point);

			return;
		}

		sprite.mousedown = sprite.touchstart = function(data) {
			var point = {x:0, y:0};

			point.x = data.global.x - this.position.x;
			point.y = data.global.y - this.position.y;
			
			this.handlePointerDown(point);

			return;
		}

		sprite.mouseup = sprite.touchend = sprite.mouseupoutside = sprite.touchendoutside = function(data) {
			var point = {x:0, y:0};

			point.x = data.global.x - this.position.x;
			point.y = data.global.y - this.position.y;
			
			this.handlePointerUp(point);

			return;
		}

		sprite.destroy = function(destroyTexture) {
			if(destroyTexture) {
				this.texture.destroy();
			}
			this.widget = null;

			return;
		}

		sprite.setX(x);
		sprite.setY(y);
		sprite.width = w;
		sprite.height = h;

		return sprite;
	}
};

