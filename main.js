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
}

function handleKeyDown (event) {
	stage.keyDown(event);
}

function handleKeyUp (event) {
	stage.keyUp(event);
}
