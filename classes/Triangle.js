function Point (x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.rotate = function (angle) {
	var curAngle = Math.atan2(this.y, this.x);
	var curRad = Math.sqrt(this.x * this.x + this.y * this.y);
	var newX = Math.cos(curAngle + angle) * curRad;
	var newY = Math.sin(curAngle + angle) * curRad;
	return new Point(newX, newY);
}

Point.prototype.translate = function (p) {
	return new Point(this.x + p.x, this.y + p.y);
}

function Line (p1, p2) {
	if (p1.x == p2.x) {
		this.x = p1.x;
		this.vert = true;
		return;
	}
	this.vert = false;
	this.m = (p1.y - p2.y) / (p1.x - p2.x);
	this.b = (p1.y - (p1.x * this.m));
}

Line.prototype.isPointAbove = function (p) {
	if (this.vert) return (p.x > this.x);
	return (p.y > this.m * p.x + this.b);
}

function Triangle (p1, p2, p3) {
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
}

Triangle.prototype.rotate = function (angle) {
	return new Triangle(this.p1.rotate(angle),
		this.p2.rotate(angle), this.p3.rotate(angle));
}

Triangle.prototype.hitTest = function (point) {
	line1 = new Line(this.p1, this.p2);
	line2 = new Line(this.p2, this.p3);
	line3 = new Line(this.p3, this.p1);
	if (line1.isPointAbove(point) != line1.isPointAbove(this.p3)) {
		return false;
	}
	if (line2.isPointAbove(point) != line2.isPointAbove(this.p1)) {
		return false;
	}
	if (line3.isPointAbove(point) != line3.isPointAbove(this.p2)) {
		return false;
	}
	return true;
}

Triangle.prototype.translate = function (p) {
	return new Triangle(this.p1.translate(p), this.p2.translate(p),
		this.p3.translate(p));
}
