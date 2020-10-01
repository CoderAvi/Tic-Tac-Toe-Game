/**
 * TicTacToe Game by Sayan Ghosh
 */
var arr,sc,sz;
var player1turn;
var gameover;
var count;
var winner;
var button;
var playerinfo;
function setup() {
	sz = 600;
	sc = sz/3;
	createCanvas(sz,sz);
	reset();			// Set state of board = new game
	button = createButton('reset',5);
	button.position(220, 620);
	button.size(170,100);
	button.style('font-size','300%');
	button.mouseReleased(reset);
	playerinfo = createP();
	playerinfo.position(650,20);
	playerinfo.style('font-size','200%');
	src=createA('https://github.com/sayan01/Tic-Tac-Toe' , 'Github Repo');
	src.position(650,150);

}
function reset(){
    arr = [1,2,3,4,5,6,7,8,9];
    count = 0;
    player1turn = true;
    gameover = false;
}
function draw() {
    background(51);
    for(i = 0;i < 9; i++){
        fill(51);
        strokeWeight(3);
        stroke(255);
        push();
        translate(((i%3)*sc),(floor((i/3))*sc));
        rect(0,0,sc,sc);
        if(arr[i] == 0){				// Draw O
            ellipse(sc/2, sc/2, sc/2, sc/2);
        }
        else if(arr[i] == -1){				// Draw X
            line(sc/4, sc/4, 3 * (sc/4),3 * (sc/4));
            line(3 * (sc/4), (sc/4), (sc/4), 3 * (sc/4));
        }
        pop();
        playerinfo.html("Player "+ ( (player1turn)?"1 (X) ":"2 (O) " )+ " turn"); // Update player info
    }
    if(gameover){			// If game over
        if(count===9){			// Check if draw, then print 'DRAW'
            textAlign(CENTER, CENTER);
            textSize(64);
            fill(255);
            stroke(51);
            strokeWeight(3);
            text("Draw!", width/2, height/2);
            playerinfo.html("Draw");
            return;
        }
	// Draw line joining the winning streak
        x1 = (winner[0]%3)*sc + sc/2;
        y1 = (floor(winner[0]/3))*sc + sc/2;
        x2 = (winner[1]%3)*sc + sc/2;
        y2 = (floor(winner[1]/3))*sc + sc/2;
        strokeWeight(20);
        line(x1, y1, x2, y2);
        playerinfo.html("Player "+((arr[winner[0]] === -1)?"1 (X) ":"2 (O) ") + "Won!");	// Update player info
    }
}
function mouseReleased(){	// Take user input at a cell
    if(gameover){   return; }	// If game over take no input
    mx = mouseX;
    my = mouseY;
    if(mx>sz || my>sz ){   return; }	// If clicked outside board do nothing
    x = floor(mx/sc);
    y = floor(my/sc);
    ind = (y*3) + x;
    if(arr[ind]<=0){return;}		// If clicked box already has symbol do nothing
    arr[ind] = (player1turn)?-1:0;	// Else, put symbol
    player1turn = !player1turn;
    count++;
    checkwon();
}
function keyPressed(){
    if(key === 'r'|| key === 'R'){
		reset();
	}
}
function checkwon(){				// Check if in current board state player has won
	if(count === 9) {			// If 9 turns are over, and no one has won, game is draw
		gameover= true;
	}
	for(i = 0;i < 3;i++)			// Check columns
		if(arr[i] == (arr[i+3]) && arr[i] == (arr[i+6])){
			gameover = true;
			winner = [i,i+6];	// Store first and last coordinate of winning boxes
		}
	for(i = 0;i<9;i+=3)			// Check rows
		if(arr[i] == (arr[i+1]) && arr[i] == (arr[i+2])){
			gameover = true;
			winner = [i,i+2];	// Store first and last coordinate of winning boxes
		}
	for(i = 0,b = 4;i < 3;i += 2,b -= 2)	// Check Diagonals
		if(arr[i] === (arr[i+b]) && arr[i] === (arr[i+b+b])){
			gameover = true;
			winner = [i,i+b+b];	// Store first and last coordinate of winning boxes
		}
}
