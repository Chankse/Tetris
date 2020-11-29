class Board {

    grid = [];
    tetromino;
    dropStart;
    frames = 0;
    speed = 36;

    onPieceLockedCallback;
    onRowClearedCallback;

    constructor(row, col, squareSize, vacantColor) {
        this.row = row;
        this.col = col;
        this.squareSize = squareSize;
        this.vacantColor = vacantColor;
        this.ctx = ctx;

        for(let i = 0; i < this.row; i++){
            this.grid[i] = [];
            for (let j = 0; j < this.col; j++) {
                 this.grid[i][j] = this.vacantColor;
            }
        }

        this.drow();

    }


    drow() {
        for(let i = 0; i < this.col; i++){
            for (let j = 0; j < this.row; j++) {
                 this.drowSquare(i,j,this.grid[j][i])
            }
        }
    }

    drowSquare(x,y,color) {
        ctx.fillStyle = color? color : '#80a3a2';
        ctx.fillRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize);
    }

    startGame(shape, color) {
        this.tetromino = new Tetromino(shape, color);
        this.tetromino.drow();
        this.frames = 0
        this.drop();
    }

    restartGame(shape, color){
        for(let i = 0; i < this.row; i++){
            this.grid[i] = [];
            for (let j = 0; j < this.col; j++) {
                 this.grid[i][j] = this.vacantColor;
            }
        }

        this.drow();

        this.tetromino.update(shape, color);
        this.tetromino.drow();
    }

    setTetromino(shape, color) {
        this.tetromino.update(shape, color);
        this.tetromino.drow();
    }

    drop(){
        this.frames++;
        if(this.frames >= this.speed) {
            this.frames = 0;
            this.moveTetrominoDown();
        }
        requestAnimationFrame(this.drop.bind(this))

    }

    moveTetrominoDown(){
        if(!this.collision(0, 1, this.tetromino.activeShape)){
            this.frames = 0;
            this.tetromino.moveDown();
        } else{
            this.lockTetromino();
            this.onPieceLockedCallback();
        }
                
    }

    moveTetrominoLeft(){
        if(!this.collision(-1, 0, this.tetromino.activeShape)){
            this.tetromino.moveLeft();
        }
    }

    moveTetrominoRight(){
        if(!this.collision(1, 0, this.tetromino.activeShape)){
            this.tetromino.moveRight();
        }
    }

    rotateTetromino(){
        let nextShape = this.tetromino.shape[(this.tetromino.shapeNum + 1) % this.tetromino.shape.length];
        let kick = 0;
        if(this.collision(0, 0, nextShape)){
            kick = this.tetromino.x > this.col/2? -1 : 1;
        }
    
        if(!this.collision(kick, 0, nextShape)){
            this.tetromino.rotate(kick);
        } 
    }

    lockTetromino() {
        for(let i = 0; i < this.tetromino.activeShape.length; i++){
            for (let j = 0; j < this.tetromino.activeShape.length; j++) {
                if(!this.tetromino.activeShape[i][j]){
                    continue;
                }
    
                if(this.tetromino.y + i <= 0){
                    alert("Game Over");
                    break;
                }
    
                this.grid[this.tetromino.y+i][this.tetromino.x+j] = this.tetromino.color;
            }
        }
    
        this.clearFullRows();
    }
    
    clearFullRows() {
        let numRowsCleared = 0;
        for(let i = 0; i < this.row; i++){
            let isFullRow = true;
            for(let j = 0; j< this.col; j++){
                isFullRow = isFullRow && (this.grid[i][j] != this.vacantColor)
            }
    
            if(isFullRow){
                for(let k = i; k > 1; k--){
                    for(let j = 0; j< this.col; j++){
                        this.grid[k][j] = this.grid[k-1][j];
                    }
                }
                for(let j = 0; j< this.col; j++){
                    this.grid[0][j] = this.vacantColor;
                }

                numRowsCleared++;
            }

        }
    
        if(numRowsCleared > 0){
            this.onRowClearedCallback(numRowsCleared);
            this.drow()
        }
    }
    
    collision(x, y, shape) {
        for(let i = 0; i < shape.length; i++){
            for (let j = 0; j < shape.length; j++) {
                
                if(!shape[i][j]){
                    continue;
                }
    
                let newX = this.tetromino.x + j + x;
                let newY = this.tetromino.y + i + y;
    
                //Check if goes out of board
                if(newX < 0 || newX >= this.col || newY >= this.row){
                    return true;
                }
    
                //Check if lays top of board
                if(newY < 0){
                }
    
                //Check detection with locked pices
                if(this.grid[newY][newX] != this.vacantColor) {
                    return true;
                }
    
    
            }
        }
    }

    updateSpeed(level){
        if(level <= 19) {
            this.speed = SPEED_PER_LEVEL[level];
        } else {
            this.speed = 1;
        }
        console.log(this.speed);
    }



}

const SPEED_PER_LEVEL = [36, 32, 29, 25, 22, 18, 15, 11, 7, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1]