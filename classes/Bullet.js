function Bullet (xvel, yvel) {
	View.call(this);
	this.x = 0;
	this.y = 0;
	this.vel_x = xvel;
	this.vel_y = yvel;
}

Bullet.prototype = new View;
Bullet.prototype.draw = function (context, time) {
	this.x += this.vel_x * (time / 1000);
	this.y += this.vel_y * (time / 1000);

	context.fillStyle = '#AAA';
	context.beginPath();
	context.arc(0, 0, 3, 0, 2 * Math.PI, false);
	context.closePath();
	context.fill();

	if (this.x > this.stage.width + 3 || this.x < -3) {
		this.remove();
	} else if (this.y > this.stage.height + 3 || this.y < -3) {
		this.remove();
	}
}
