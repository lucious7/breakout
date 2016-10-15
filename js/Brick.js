function Brick(pos){
    this.pos = pos;
    this.fillStyle = "rgb(255, 255, 255)";
    this.width = 25;
    this.height = 10;
};

Brick.prototype.draw = function(screen){
    screen.fillStyle = this.fillStyle;
    screen.fillRect(this.pos.x, this.pos.y, this.width, this.height);
}