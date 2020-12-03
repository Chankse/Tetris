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
let howToPlayTextPart1 = "Press ENTER to start/restart. Press P to pause/resume"
let howToPlayTextPart2 = "Use ARROW KEYS to navigate tetrominos"
ctx.fillText(howToPlayTextPart1, 0, 625);
ctx.fillText(howToPlayTextPart2, 0, 645);




document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(event) {
    let key = event.key != ' ' ? event.key : event.code;
    switch(key){
        case 'ArrowLeft':
        case 'ArrowRight': 
            board.onLeftRightKeyDown(key);
            break;
            case 'ArrowUp':
                board.onRotateKeyDown();
                break;
            case 'ArrowDown':
                board.onMoveDownKeyDown();
                break;
    }
}

function onKeyUp(event) {
    let key = event.key != ' ' ? event.key : event.code;
    switch(key){
        case 'ArrowLeft':
        case 'ArrowRight': 
            board.onLeftRightKeyUp(key);
            break;
        case 'ArrowUp':
            board.onRotateKeyUp();
            break;
        case 'ArrowDown':
            board.onMoveDownKeyUp();
            break;
        case 'Enter':
            onEnterClick();
            break;
         case 'p':
            onPauseClick();
            break;
    }
}

onEnterClick = onStart;
onPauseClick = () => {};

function onStart(){
    gameStarted = true;
    let piece = nextPieceBoard.getPiece();
    board.startGame(piece[0], piece[1]);
    nextPieceBoard.generateNextPiece();
    onEnterClick = onRestart;
    onPauseClick = onPause;
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
