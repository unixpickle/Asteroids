function Stage (canvas) {
	this.canvas = canvas;
	this.subviews = [];
	this.lastDraw = null;
	this.animating = false;
	this.keys = [];
	this.width = canvas.width;
	this.height = canvas.height;
}

Stage.prototype.add = function (view) {
	this.subviews.push(view);
	view.stage = this;
}

Stage.prototype.remove = function (view) {
	var index = this.subviews.indexOf(view);
	if (index < 0) return;
	this.subviews[index].stage = null;
	this.subviews.splice(index, 1);
}

Stage.prototype.viewsOfType = function (type) {
	var views = [];
	for (var i = 0; i < this.subviews.length; i++) {
		var sv = this.subviews[i];
		if (sv.type() == type) {
			views.push(sv);
		}
	}
	return views;
}

Stage.prototype.draw = function () {
	var newDate = new Date();
	var newDraw = newDate.getTime();
	var delay = 0;
	if (this.lastDraw != null) {
		delay = newDraw - this.lastDraw;
	}
	this.lastDraw = newDraw;

	var context = this.canvas.getContext('2d');
	context.fillStyle = '#000';
	context.fillRect(0, 0, this.width, this.height);

	var svs = this.subviews.slice(0);
	for (var i = 0; i < svs.length; i++) {
		var subview = svs[i];
		if (subview.stage == this) {
			context.save();
			context.translate(subview.x, subview.y);
			subview.draw(context, delay);
			context.restore();
		}
	}
}

Stage.prototype.setAnimating = function (flag) {
	this.animating = flag;
	if (flag) {
		this.animateFrame();
	} else {
		this.lastDraw = null;
	}
}

Stage.prototype.animateFrame = function () {
	if (this.animating == true) {
		this.draw();
		setTimeout(this.animateFrame.bind(this), 42);
	}
}

Stage.prototype.keyDown = function (event) {
	var index = this.keys.indexOf(event.keyCode);
	if (index < 0) {
		this.keys.push(event.keyCode);
	}
}

Stage.prototype.keyUp = function (event) {
	var index = this.keys.indexOf(event.keyCode);
	if (index >= 0) {
		this.keys.splice(index, 1);
	}
}

Stage.prototype.isKeyDown = function (keyCode) {
	var index = this.keys.indexOf(keyCode);
	if (index >= 0) {
		return true;
	}
	return false;
}
