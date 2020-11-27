class Tetromino {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;

        this.shapeNum = 0;
        this.activeShape = this.shape[this.shapeNum];

        this.x = 0;
        this.y = 0;
    }

    update(shape, color){
        this.shape = shape;
        this.color = color;

        this.shapeNum = 0;
        this.activeShape = this.shape[this.shapeNum];

        this.x = 0;
        this.y = 0;
    }

    moveDown(){
        this.clear();
        this.y++;
        this.drow();
    }

    moveRight(){
        this.clear();
        this.x++;
        this.drow();
    }

    moveLeft(){
        this.clear();
        this.x--;
        this.drow();
    }

    rotate(kick) {
        this.clear();
        kick && (this.x += kick);
        this.shapeNum = (this.shapeNum + 1) % this.shape.length;
        this.activeShape = this.shape[this.shapeNum];
        this.drow();
    }

    drow() {
        for(let i = 0; i < this.activeShape.length; i++){
            for (let j = 0; j < this.activeShape.length; j++) {
                if(this.activeShape[i][j]){
                    drowSquare(this.x + j, this.y + i, this.color);
                }
            }
        }
    }

    clear() {
        for(let i = 0; i < this.activeShape.length; i++){
            for (let j = 0; j < this.activeShape.length; j++) {
                if(this.activeShape[i][j]){
                    drowSquare(this.x + j, this.y + i, VACANT);
                }
            }
        }
    }

}