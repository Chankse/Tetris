class InfoPanel {

    onLevelChangeCallback;

    constructor(vacantColor) {
        this.width = 120;
        this.height = 400;
        this.xOffset = 400;
        this.yOffset = 200;
        this.vacantColor = vacantColor;

        this.level = 0;
        this.lines = 0;
        this.score = 0;

        this.drow();
    }


    drow(){
        ctx.fillStyle = this.vacantColor;
        ctx.fillRect(this.xOffset, this.yOffset, this.width, this.height)
        ctx.fillStyle = '#000000';
        ctx.font = "24px Arial";
        ctx.fillText("Level: " + this.level, this.xOffset, this.yOffset + 30);
        ctx.fillText("Lines: " + this.lines, this.xOffset, this.yOffset + 60);
        ctx.font = "28px Arial";
        ctx.fillText("Score:", this.xOffset, this.yOffset + 100)
        ctx.fillText(this.score, this.xOffset, this.yOffset + 130)
    }

    onRowClear(n) {
        this.lines += n;
        let newLevel = Math.floor(this.lines/10);
        if(newLevel > this.level){
            this.level = newLevel;
            this.onLevelChangeCallback(this.level);
        }
        this.score += (this.level + 1) * POINTS_FOR_LINES[n-1];

        this.drow();
    }
}

const POINTS_FOR_LINES = [40, 100, 300, 1200]