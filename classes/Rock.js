function Rock (rsize) {
	View.call(this);
	this.size = rsize;
	this.image = new Image();
	this.image.src = 'rock.png';
	this.vel_x = (Math.random() - 0.5) * 12;
	this.vel_y = (Math.random() - 0.5) * 12;
	if (this.vel_x < 0) this.vel_x -= 5;
	if (this.vel_x > 0) this.vel_x += 5;
	if (this.vel_y < 0) this.vel_y -= 5;
	if (this.vel_y > 0) this.vel_y += 5;
}

Rock.prototype = new View;
Rock.prototype.type = function () { return 'Rock'; }
Rock.prototype.radius = function () { return this.size / 2; }

Rock.prototype.distanceFrom = function (x, y) {
	return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
}

Rock.prototype.draw = function (context, time) {
	context.drawImage(this.image, -this.radius(), -this.radius(), this.size, this.size);
	this.x += this.vel_x * (time / 1000);
	this.y += this.vel_y * (time / 1000);
	this.wrapSides();
}

Rock.prototype.wrapSides = function () {
    if (0 - this.radius() > this.x) {
        this.x = this.stage.width + this.radius() - ((0 - this.radius()) - this.x);
    } else if (this.x > this.stage.width + this.radius()) {
        this.x = 0 - this.radius() - (this.x - (this.stage.width + this.radius()));
    }
    if (0 - this.radius() > this.y) {
        this.y = this.stage.height + this.radius() - ((0 - this.radius()) - this.y);
    } else if (this.y > this.stage.height + this.radius()) {
        this.y = 0 - this.radius() - (this.y - (this.stage.height + this.radius()));
    }
}

Rock.prototype.hit = function () {
	if (this.size > 20) {
		var rock1 = new Rock(this.size / 2);
		var rock2 = new Rock(this.size / 2);
		rock1.x = this.x + 30;
		rock1.y = this.y + 30;
		rock2.x = this.x - 30;
		rock2.y = this.y - 30;

		this.stage.add(rock1);
		this.stage.add(rock2);
	}
	if (this.stage.viewsOfType('Rock').length <= 1) {
		addRock();
	}
	this.remove();
}

Rock.prototype.hitTest = function (x, y) {
	distance = this.distanceFrom(x, y);
	if (distance <= this.radius()) {
		return true;
	}
	return false;
}

Rock.prototype.hitTestTriangle = function (triangle) {
	var angle = 0;
	var radius = this.radius();
	for (angle = 0; angle < 2 * Math.PI; angle += Math.PI / 30) {
		var x = Math.cos(angle) * radius + this.x;
		var y = Math.sin(angle) * radius + this.y;
		if (triangle.hitTest(new Point(x, y))) {
			return true;
		}
	}
	return false;
}
