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


ctx.fillStyle = '#000000';
ctx.font = "20px Arial";
let howToPlayTextPart1 = "Press ENTER to start/restart. Press SPACE to pause/resume"
let howToPlayTextPart2 = "Use ARROW KEYS to navigate tetrominos"
ctx.fillText(howToPlayTextPart1, 0, 625);
ctx.fillText(howToPlayTextPart2, 0, 645);






document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
    let key = event.key != ' ' ? event.key : event.code;
    switch(key){
        case 'ArrowLeft': 
            board.moveTetrominoLeft();
            break;
        case 'ArrowUp':
            board.rotateTetromino();
            break;
        case 'ArrowRight': 
            board.moveTetrominoRight();
            break;
        case 'ArrowDown':
            board.moveTetrominoDown();
            break;
        case 'Enter':
            onEnterClick();
            break;
        case 'Space':
            onSpaceClick();
            break;

    }
}

onEnterClick = onStart;
onSpaceClick = () => {};

function onStart(){
    gameStarted = true;
    let piece = nextPieceBoard.getPiece();
    board.startGame(piece[0], piece[1]);
    nextPieceBoard.generateNextPiece();
    onEnterClick = onRestart;
    onSpaceClick = onPause;
}

function onRestart(){
    let piece = nextPieceBoard.getPiece();
    board.restartGame(piece[0], piece[1]);
    nextPieceBoard.generateNextPiece();
    infoPanel.onRestart();
}

let gamePaused = false;

function onPause(){
    gamePaused = !gamePaused;
    board.pauseGame(gamePaused);
}
