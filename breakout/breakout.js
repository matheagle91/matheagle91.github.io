"use strict"
var main = document.getElementById("main");
var ball;
var intervalID;
var ballX = (800-30)/2;
var ballY = main.offsetTop+300;
// ball velocity
var msPerFrame = 20;
var secondsPerFrame = msPerFrame / 1000;
var paddle;
var paddlePosition;

// This sets horizontal rate to 200--600 pixels/second
var vx = secondsPerFrame * (Math.floor(Math.random() * 400) + 200);
if (Math.random() < 0.5) {
	vx = -vx;
}

// This sets verical rate to 500 pixels/second
var vy = secondsPerFrame * 500;


function createGrid() {
	for (var col=0;col<=9;col++) {
		for (var row=0;row<10;row++) {
			var brick = document.createElement("div");
			brick.classList.add("brick");
			brick.classList.add("row"+row);
			brick.classList.add("col"+col);
			main.appendChild(brick);
		}
	}
};
function breakBrick(row,col) {
	var brick = document.getElementsByClassName("row"+row+" col"+col);
	if(brick[0] && !brick[0].classList.contains("broken")) {
		brick[0].classList.add("broken");
		return true;
	} else {
		return false;
	}
};
function createPaddle() {
	paddle = document.createElement("div");
	paddle.id = "paddle";
	paddle.style.left = (800-140)/2;
	main.appendChild(paddle);
}
function mouseHandler(event) {
	paddle = document.getElementById("paddle");
	var center = window.innerWidth/2;
	var maxL = center - 330;
	var maxR = center + 330;
	var x=event.clientX;
	if (x>maxL && x<maxR) {
		var position = x-maxL;
		paddle.style.left = position;
		paddlePosition = position;
	}

}

function createBall() {
	ball = document.createElement("div");
	ball.id = "ball";
	ball.classList.add("broken");
	ball.style.left = ballX;
	ball.style.top = ballY;
	main.appendChild(ball);
}




function clickHandler() {
	ball.classList.remove("broken");
	intervalID = window.setInterval(moveBall, 20);
	document.body.removeEventListener("click",clickHandler);
}

function moveBall() {
	
	ballX += vx;
	ballY += vy;
	checkForCollision(ballX, ballY)
	

	ball.style.left = ballX;
	ball.style.top = ballY;
	
}
function brickCollision(x,y) {
	var brickHeight = 20;
	var brickWidth = 80;
	
	var row = Math.floor((y+15-100)/brickHeight);
	var col = Math.floor(x/brickWidth);
	var row1 = Math.floor((y-100)/brickHeight);
	var col1 = Math.floor(x+15/brickWidth);
	var row2 = Math.floor((y-15-100)/brickHeight);
	var col2 = Math.floor(x/brickWidth);
	var row3 = Math.floor((y-100)/brickHeight);
	var col3 = Math.floor(x-15/brickWidth);

	//var key = "brick" + col + "-" + row;
	if (row1 < 10 && col1 < 10) {
		if (breakBrick(row1,col1)) {
			vx = -vx;
		}
	} else if (row3 < 10 && col3 < 10) {
		if (breakBrick(row3,col3)) {
			vx = -vx;
		}
	} else if (row < 10 && col < 10) {
		if (breakBrick(row,col)) {
			vy = -vy;
		}
	} else if (row2 < 10 && col2 < 10) {
		if (breakBrick(row2,col2)) {
			vy = -vy;
		}
	}
	
}

function paddleCollision(x,y) {
	var paddleLeft = paddlePosition;
	var paddleRight = paddleLeft + 140;
	if ((y >= 550) && (x >= paddleLeft) && (x <= paddleRight)) {
		vy = -vy;
		ballY = 520;
	}
}

function wallCollision(x,y) {
	if (x <= 0 || x >= 770) {
		vx = -vx;
	}
	if (y <= 0 || y >= 570) {
		vy = -vy;
	}
}

function checkForCollision(x,y) {
	//paddle
	paddleCollision(x + 15,y + 30);
	//bricks
	brickCollision(x + 15,y +15);

	//walls
	wallCollision(x,y);
	
}

function newGame() {
	while (main.firstChild) {
		main.removeChild(main.firstChild)
	}
	document.body.removeEventListener("mousemove",mouseHandler);
	document.body.removeEventListener("click",clickHandler);
	createGrid();
	createPaddle();
	createBall();
	document.body.addEventListener("mousemove",mouseHandler);
	document.body.addEventListener("click",clickHandler);
}

newGame();


