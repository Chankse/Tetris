const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

const ROW = 20;
const COL = 10;
const SQUARE = 30; //20px
const VACANT = '#80a3a2' //color of empty cell

const PIECES = [
    [Z,'red'],
    [T,'orange'],
    [S,'yellow'],
    [O,'green'],
    [L,'blue'],
    [J,'indigo'],
    [I,'violet'],
]

function drowSquare(x,y,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQUARE, y*SQUARE, SQUARE, SQUARE);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x*SQUARE, y*SQUARE, SQUARE, SQUARE);
}

drowSquare(0,0,'red')

let board = [];
for(let i = 0; i < ROW; i++){
    board[i] = [];
    for (let j = 0; j < COL; j++) {
         board[i][j] = VACANT;
    }
}

function drowBoard() {
    for(let i = 0; i < COL; i++){
        for (let j = 0; j < ROW; j++) {
             drowSquare(i,j,board[j][i])
        }
    }
}

drowBoard();


function lockTetromino() {
    for(let i = 0; i < tetromino.activeShape.length; i++){
        for (let j = 0; j < tetromino.activeShape.length; j++) {
            if(!tetromino.activeShape[i][j]){
                continue;
            }

            if(tetromino.y + i <= 0){
                // location.reload();
                alert("Game Over");
                break;
            }

            board[tetromino.y+i][tetromino.x+j] = tetromino.color;
        }
    }

    clearFullRows();
}

function clearFullRows() {
    let clearHappened = false;
    for(let i = 0; i < ROW; i++){
        let isFullRow = true;
        for(let j = 0; j< COL; j++){
            isFullRow = isFullRow && (board[i][j] != VACANT)
        }

        if(isFullRow){
            for(let k = i; k > 1; k--){
                for(let j = 0; j< COL; j++){
                    board[k][j] = board[k-1][j];
                }
            }
            for(let j = 0; j< COL; j++){
                board[0][j] = VACANT;
            }
        }

        clearHappened = clearHappened || isFullRow;
    }

    if(clearHappened){
        drowBoard()
        console.log(board);
    }
}


function collision(x, y, shape) {
    for(let i = 0; i < shape.length; i++){
        for (let j = 0; j < shape.length; j++) {
            
            if(!shape[i][j]){
                continue;
            }

            let newX = tetromino.x + j + x;
            let newY = tetromino.y + i + y;

            //Check if goes out of board
            if(newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }

            //Check if lays top of board
            if(newY < 0){
            }

            //Check detection with locked pices
            if(board[newY][newX] != VACANT) {
                return true;
            }


        }
    }
}

function moveTetrominoDown(){
    if(!collision(0, 1, tetromino.activeShape)){
        dropStart = Date.now();
        tetromino.moveDown();
    } else{
        lockTetromino();
        let piece = randomPiece()
        tetromino.update(piece[0], piece[1])
        tetromino.drow();
    }
            
}
function moveTetrominoLeft(){
    if(!collision(-1, 0, tetromino.activeShape)){
        dropStart = Date.now();
        tetromino.moveLeft();
    } else{

    }
}
function moveTetrominoRight(){
    if(!collision(1, 0, tetromino.activeShape)){
        dropStart = Date.now();
        tetromino.moveRight();
    } else{

    }
}
function rotateTetromino(){
    let nextShape = tetromino.shape[(tetromino.shapeNum + 1) % tetromino.shape.length];
    let kick = 0;
    if(collision(0, 0, nextShape)){
        kick = tetromino.x > COL/2? -1 : 1;
    }

    if(!collision(kick, 0, nextShape)){
        dropStart = Date.now();
        tetromino.rotate(kick);
    } else{

    }
}




document.addEventListener('keydown', userEvent);

function userEvent(event) {
    switch(event.keyCode){
        case 37: 
            moveTetrominoLeft();
            break;
        case 38:
            rotateTetromino();
            break;
        case 39: 
            moveTetrominoRight();
            break;
        case 40:
            moveTetrominoDown();
            break;

    }
}

function randomPiece() {
    let rand = Math.floor(Math.random() * PIECES.length);
    return PIECES[rand];
}

let piece = randomPiece()
let tetromino = new Tetromino(piece[0], piece[1]);
tetromino.drow();


let dropStart = Date.now();
function drop(){

    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000) {
        moveTetrominoDown();
    }
    requestAnimationFrame(drop)

}

drop()