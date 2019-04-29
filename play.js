let c = document.getElementById("myCanvas");
let cxt = c.getContext("2d");
let head = {x: 0, y: 0};	// Snake starts at the upperleft conner,
let move = {dx: 1, dy: 0};	// and moving towards right.
let grid = new Array(30);	// info of each block of the field

// initialize
for (let i = 0; i < 30; i++) {
	grid[i] = new Array(30);
	debugger;
	for (let j = 0; j < 30; j++)
		grid[i][j] = 0;
}
grid[0][0] = 1;		// snake's head	
grid[15][15] = -1;	// food

// main
document.onkeyup = command;
render();

function drawCircle(a, b) {
	cxt.fillStyle = "white";
	cxt.beginPath();
	cxt.arc(a, b, 10, 0, Math.PI*2, true);
	cxt.closePath();
	cxt.fill();
}

function addPoint() {
	let a = 1, b = 1;
	a = Math.floor(Math.random() * 30);
	b = Math.floor(Math.random() * 30);
	grid[a][b] = -1;
}

function render() {
	let newHead = { x: head.x + move.dx, y: head.y + move.dy };

	// for debugging
	console.log("head:");
	console.log(head);
	console.log("move:");
	console.log(move);
	console.log("newHead:");
	console.log(newHead);

	// check move validity
	if (newHead.x < 0 || newHead.x >=  30 || 
		newHead.y < 0 || newHead.y >= 30) {
		// game over
		alert("You lose.");
		return;
	}

	if (grid[ newHead.x ][ newHead.y ] < 0) {
		// food caught, make it the new head and generate new food
		grid[ newHead.x ][ newHead.y ] = grid[ head.x ][ head.y ] + 1;
		head = newHead;
		addPoint();
	} else {
		// snake creeps
		grid[ newHead.x ][ newHead.y ] = grid[ head.x ][ head.y ] + 1;
		head = newHead;
		for (let i = 0 ; i < 30; i++)
			for (let j = 0; j < 30; j++)
				if (grid[i][j] > 0)
					grid[i][j]--;
	}

	// the render process
	cxt.fillStyle = "black";
	cxt.fillRect(0, 0, 600, 600);
	for (let i = 0; i < 30; i++)
		for (let j = 0; j < 30; j++)
			if (grid[i][j] != 0)
				drawCircle(i * 20 + 10, j * 20 + 10);

	let timerId = setTimeout(render, 175);
}

function command(event) {
	let key = event.keyCode;
	switch(key) {
		case 37: move.dx = -1; move.dy = 0; break;
		case 38: move.dx = 0; move.dy = -1; break;
		case 39: move.dx = 1; move.dy = 0; break;
		case 40: move.dx = 0; move.dy = 1; break;
	}
}
