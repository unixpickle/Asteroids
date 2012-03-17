function Ship (size) {
	View.call(this);
	this.x = 100;
	this.y = 100;
	this.angle = 0;
	this.size = size;

	this.vel_a = 0;
	this.vel_x = 0;
	this.vel_y = 0;
	this.fric = 50;
	this.fric_a = 50;
	this.bull = 200;
}

Ship.prototype = new View;
Ship.prototype.type = function () { return 'Ship'; }

Ship.prototype.nosePosition = function () {
	obj = new Object();
	obj.x = this.x + Math.cos(this.angle * Math.PI / 180) * this.size;
	obj.y = this.y + Math.sin(this.angle * Math.PI / 180) * this.size;
	return obj;
}

Ship.prototype.draw = function (context, time) {
	context.rotate(this.angle * Math.PI / 180);

	context.fillStyle = '#F00';
	context.beginPath();
	context.moveTo(this.size, 0);
	context.lineTo(-this.size / 2, -this.size * (Math.sqrt(3) / 2.0));
	context.lineTo(-this.size / 2, this.size * (Math.sqrt(3) / 2.0));
	context.closePath();
	context.fill();

	context.fillStyle = '#0F0';
	context.beginPath();
	context.moveTo(this.size * 0.5, -this.size / Math.sqrt(3) / 2);
	context.lineTo(this.size, 0);
	context.lineTo(this.size * 0.5, this.size / Math.sqrt(3) / 2);
	context.closePath();
	context.fill();

	if (this.stage.isKeyDown(37)) {
		this.vel_a -= 200 * (time / 1000);
	}
	if (this.stage.isKeyDown(39)) {
		this.vel_a += 200 * (time / 1000);
	}
	if (this.stage.isKeyDown(38)) {
		var xcoeff = Math.cos(this.angle * Math.PI / 180);
		var ycoeff = Math.sin(this.angle * Math.PI / 180);
		this.vel_x += xcoeff * 200 * (time / 1000);
		this.vel_y += ycoeff * 200 * (time / 1000);
	}
	if (this.stage.isKeyDown(32)) {
		this.shootBullet();
	}

	this.angle += this.vel_a * (time / 1000);
	this.x += this.vel_x * (time / 1000);
	this.y += this.vel_y * (time / 1000);
	this.applyFric(time);
	this.wrapSides();
}

Ship.prototype.applyFric = function (time) {
	var fric_a = this.fric_a;
	var fric = this.fric;
	if (this.stage.isKeyDown(40)) {
		fric_a *= 4;
		fric *= 4;
	}
	if (this.vel_a > 0) {
		this.vel_a -= fric_a * (time / 1000);
		if (this.vel_a < 0) {
			this.vel_a = 0;
		}
	} else if (this.vel_a < 0) {
		this.vel_a += fric_a * (time / 1000);
		if (this.vel_a > 0) {
			this.vel_a = 0;
		}
	}
	var totalVel = Math.sqrt(Math.pow(this.vel_x, 2) + Math.pow(this.vel_y, 2));
	var angle = Math.atan2(this.vel_y, this.vel_x);
	if (totalVel > 0) {
		totalVel -= fric * (time / 1000);
		if (totalVel < 0) {
			totalVel = 0;
		}
	} else if (totalVel < 0) {
		totalVel += fric * (time / 1000);
		if (totalVel > 0) {
			totalVel = 0;
		}
	}
	this.vel_y = Math.sin(angle) * totalVel;
	this.vel_x = Math.cos(angle) * totalVel;
}

Ship.prototype.wrapSides = function () {
	if (0 - this.size > this.x) {
		this.x = this.stage.width + this.size - ((0 - this.size) - this.x);
	} else if (this.x > this.stage.width + this.size) {
		this.x = 0 - this.size + (this.x - (this.stage.width + this.size));
	}
	if (0 - this.size > this.y) {
		this.y = this.stage.height + this.size - ((0 - this.size) - this.y);
	} else if (this.y > this.stage.height + this.size) {
		this.y = 0 - this.size + (this.y - (this.stage.height + this.size));
	}
}

Ship.prototype.shootBullet = function () {
	var start = this.nosePosition();
	var xmov = Math.cos(ship.angle * Math.PI / 180) * this.bull + this.vel_x;
	var ymov = Math.sin(ship.angle * Math.PI / 180) * this.bull + this.vel_y;
	var bullet = new Bullet(xmov, ymov);
	this.stage.add(bullet);
	bullet.setPosition(start.x, start.y);
}

