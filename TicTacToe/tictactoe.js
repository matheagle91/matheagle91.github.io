var turns = 0;



function getCellWithCoordinates(x,y){
	return document.getElementById("square"+x+y);
}

var playerSymbol = "X"

function areWinningCells(a,b,c) {
	if ((a.innerHTML != '&nbsp;')&& (a.innerHTML===b.innerHTML)&&(a.innerHTML===c.innerHTML)){
		a.classList.add("winner");
		b.classList.add("winner");
		c.classList.add("winner");
		return true;
	} else {
		return false;
	}
}
var square = [];
square[0]=getCellWithCoordinates(0,0);
square[1]=getCellWithCoordinates(0,1);
square[2]=getCellWithCoordinates(0,2);
square[3]=getCellWithCoordinates(1,0);
square[4]=getCellWithCoordinates(1,1);
square[5]=getCellWithCoordinates(1,2);
square[6]=getCellWithCoordinates(2,0);
square[7]=getCellWithCoordinates(2,1);
square[8]=getCellWithCoordinates(2,2);
console.log(square)

function checkWinner() {
	if(areWinningCells(square[0],square[1],square[2])||areWinningCells(square[0],square[3],square[6])||areWinningCells(square[0],square[4],square[8])||areWinningCells(square[3],square[4],square[5])||areWinningCells(square[6],square[7],square[8])||areWinningCells(square[1],square[4],square[7])||areWinningCells(square[2],square[5],square[8])||areWinningCells(square[2],square[4],square[6])) {
		alert("WINNER is " + playerSymbol);
		document.location.reload();
	} else if (turns>=9){
		alert("Tie");
		document.location.reload();
	} else {
		return
	}
};

function clickHandler() {
	if (this.innerHTML === "X" || this.innerHTML === "O"){
		return
	} else {
		this.innerHTML = playerSymbol;
	}
	turns++
	checkWinner();
	if (playerSymbol === "X") {
		playerSymbol = "O";
	} else {
		playerSymbol = "X";
	}
	
}



for (col = 0;col<3;col++) {
	for (row=0;row<3;row++){
		var cell=getCellWithCoordinates(col,row);
		cell.onclick = clickHandler;
	}
}