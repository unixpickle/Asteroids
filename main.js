var stage = null;
var ship = null;

function setupScene () {
	var canvas = document.getElementById('canvas');

	ship = new Ship(20);
	stage = new Stage(canvas);

	stage.add(ship);
	stage.setAnimating(true);

	window.addEventListener('keydown', handleKeyDown, true);
	window.addEventListener('keyup', handleKeyUp, true);
	addRock();
}

function handleKeyDown (event) {
	stage.keyDown(event);
}

function handleKeyUp (event) {
	stage.keyUp(event);
}

function addRock () {
	var rock = new Rock(80);
	rock.x = Math.random() * stage.width;
	rock.y = -rock.radius();
	stage.add(rock);
}

function rockTest (bullet) {
	var rocks = stage.viewsOfType('Rock');
	for (var i = 0; i < rocks.length; i++) {
		var rock = rocks[i];
		if (rock.hitTest(bullet.x, bullet.y)) {
			rock.hit();
			bullet.remove();
			return;
		}
	}
}
