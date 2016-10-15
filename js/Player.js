function Player(gameLimits){
    this.gameLimits = gameLimits;
    this.fillStyle = "rgb(255, 255, 255)";
    this.width = 60;
    this.height = 10;
    this.speed = 10;
    this.pos = {x: (this.gameLimits.right - this.gameLimits.left)/2 - this.width/2,
                y: this.gameLimits.bottom - 30};
    this.keyboarder = new Keyboarder();
};

Player.prototype.update = function(){
    if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && this.pos.x > this.gameLimits.left){
        this.pos.x -= this.speed;
    }
    if(this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && this.pos.x + this.width < this.gameLimits.right){
        this.pos.x += this.speed;
    }
};

Player.prototype.draw = function(screen){
    screen.fillStyle = this.fillStyle;
    screen.fillRect(this.pos.x, this.pos.y, this.width, this.height);
};