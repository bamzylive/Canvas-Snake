var c = document.getElementById("myCanvas");
var cxt = c.getContext("2d");
var first = new Array(0, 0);
var grid = new Array(30), move = new Array(1, 0);
for (var i = 0; i < 30; i++) {
	grid[i] = new Array(30);
	for (var j = 0; j < 30; j++)
		grid[i][j] = 0;
}

function drawCircle(a, b) {
	cxt.fillStyle = "black";
	cxt.beginPath();
	cxt.arc(a, b, 10, 0, Math.PI*2, true);
	cxt.closePath();
	cxt.fill();
}

function addPoint() {
	var a = 1, b = 1;
	a = Math.floor(Math.random() * 30);
	b = Math.floor(Math.random() * 30);
	grid[a][b] = -1;
}

function draw() {
	document.onkeyup = command;
	if (grid[ first[0]+move[0] ][ first[1]+move[1] ] < 0) {
		addPoint();
		first[0] += move[0];
		first[1] += move[1];
		grid[ first[0] ][ first[1] ] = grid[ first[0]-move[0] ][ first[1]-move[1] ] + 1;
	} else {
		first[0] += move[0];
		first[1] += move[1];
		grid[ first[0] ][ first[1] ] = grid[ first[0]-move[0] ][ first[1]-move[1] ] + 1;
		for (var i = 0 ; i < 30; i++)
			for (var j = 0; j < 30; j++)
				if (grid[i][j] > 0)
					grid[i][j]--;
	}
	for (var i = 0; i < 30; i++)
		for (var j = 0; j < 30; j++)
			if (grid[i][j] != 0)
				drawCircle(i * 20 + 10, j * 20 + 10);
	var t = setTimeout("clear()", 200);
}

function command(event) {
	var key = event.keyCode;
	switch(key) {
		case 37: move[0] = -1; move[1] = 0; break;
		case 38: move[0] = 0; move[1] = -1; break;
		case 39: move[0] = 1; move[1] = 0; break;
		case 40: move[0] = 0; move[1] = 1; break;
	}
}

function clear() {
	cxt.fillStyle = "white";
	cxt.fillRect(0, 0, 600, 600);
	draw();
}

grid[0][0] = 1;
grid[15][15] = -1;
move[0] = 1;
move[1] = 0;
draw();
