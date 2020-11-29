const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');


let board = new Board(20, 10, 30, '#80a3a2', ctx);
let nextPieceBoard = new NextPiece(4, 4, 30,'#80a3a2' );
let infoPanel = new InfoPanel('#80a3a2')




board.onPieceLockedCallback = () => {
    let piece = nextPieceBoard.getPiece();
    board.setTetromino(piece[0], piece[1]);
    nextPieceBoard.generateNextPiece();
}

board.onRowClearedCallback = (numRowsCleared) =>{
    infoPanel.onRowClear(numRowsCleared);
}

infoPanel.onLevelChangeCallback = (level) => {
    board.updateSpeed(level);
}









document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
    switch(event.keyCode){
        case 37: 
            board.moveTetrominoLeft();
            break;
        case 38:
            board.rotateTetromino();
            break;
        case 39: 
            board.moveTetrominoRight();
            break;
        case 40:
            board.moveTetrominoDown();
            break;

    }
}


let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', onStartBtnClick)

let restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', onRestartBtnClick);

function onStartBtnClick(){
    startBtn.classList.add('d-none');
    restartBtn.classList.remove('d-none');

    let piece = nextPieceBoard.getPiece();
    board.startGame(piece[0], piece[1]);
    nextPieceBoard.generateNextPiece();
}

function onRestartBtnClick(){
    let piece = nextPieceBoard.getPiece();
    board.restartGame(piece[0], piece[1]);
    nextPieceBoard.generateNextPiece();
}
