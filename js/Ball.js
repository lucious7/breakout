function Ball(gameLimits){
    this.fillStyle = "rgb(255, 255, 255)";
    this.gameLimits = gameLimits;
    this.pos = {x: (this.gameLimits.right - this.gameLimits.left)/2, 
                y: (this.gameLimits.bottom - this.gameLimits.top)/2};
    this.speed = {x: Math.random() * 3, y: 6};
    this.width = this.height = 10;
};

Ball.prototype.update = function(){
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
};

Ball.prototype.draw = function(screen){
    screen.fillStyle = this.fillStyle;
    screen.fillRect(this.pos.x, this.pos.y, this.width, this.height);
};