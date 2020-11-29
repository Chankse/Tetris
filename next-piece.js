class NextPiece {
    grid = [];
    tetromino;
    xOffset = 400;
    yOffset = 30;
    textHeight = 30;
    


    constructor(row, col, squareSize, vacantColor) {
        this.row = row;
        this.col = col;
        this.squareSize = squareSize;
        this.vacantColor = vacantColor;

        ctx.fillStyle = "#000000"
        ctx.font = "28px Arial";
        ctx.fillText("Next:",this.xOffset, this.yOffset - 10);

        for(let i = 0; i < this.row; i++){
            this.grid[i] = [];
            for (let j = 0; j < this.col; j++) {
                 this.grid[i][j] = this.vacantColor;
            }
        }

        this.drow();

        let rand = Math.floor(Math.random() * PIECES.length);
        this.tetromino = new Tetromino(PIECES[rand][0], PIECES[rand][1], this.xOffset, this.yOffset);
        this.tetromino.drow();
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
        ctx.fillRect(x*this.squareSize + this.xOffset, y*this.squareSize + this.yOffset, this.squareSize, this.squareSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x*this.squareSize + this.xOffset, y*this.squareSize + this.yOffset, this.squareSize, this.squareSize);
    }

    generateNextPiece() {
        this.tetromino.clear()
        let rand = Math.floor(Math.random() * PIECES.length);
        this.tetromino.update(PIECES[rand][0], PIECES[rand][1]);
        this.tetromino.drow();
    }

    getPiece(){
        return [this.tetromino.shape, this.tetromino.color];
    }

}