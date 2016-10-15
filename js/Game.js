function Game(scene){
    this.screen = scene.getContext("2d");
    this.width = scene.width;
    this.height = scene.height;
    this.limits = {left: 15, top: 50, right: this.width-15, bottom: this.height};
    
    this.bricks = createBricks();
    this.player = new Player(this.limits);
    this.ball = new Ball(this.limits);
    
    this.ballCount = 1;
    this.points = 0;
    
    var self = this;
    function tick(){
        self.update();
        self.draw();
        
        requestAnimationFrame(tick);
    };
    
    tick();
};

Game.prototype.update = function(){
    this.player.update();
    this.ball.update();
    this.handleCollision();
};

Game.prototype.handleCollision = function () {
    if(this.ball.pos.y >= this.player.pos.y){
        this.ballCount++;
        this.ball = new Ball(this.limits);
        return;
    }
    if(this.ball.pos.x <= this.limits.left || this.ball.pos.x + this.ball.width >= this.limits.right){
        this.ball.speed.x = -this.ball.speed.x;
    }
    if(this.ball.pos.y <= this.limits.top + 10){
        this.ball.speed.y = -this.ball.speed.y;
    }
    if(checkCollision(this.player, this.ball)){
        this.ball.speed.x = ((this.ball.pos.x + this.ball.width/2)-(this.player.pos.x + this.player.width/2))%6;
        this.ball.speed.y = -this.ball.speed.y;
    }
    
    this.bricks.forEach(function (b) {
        if(checkCollision(this.ball, b)){
            b.isColliding = true;
            this.points++;
            this.ball.speed.y = -this.ball.speed.y; 
        }
    }, this);
    
    this.bricks = this.bricks.filter(b => !b.isColliding);
    
};

function checkCollision(a, b){
    return (
        (
            (a.pos.y >= b.pos.y && a.pos.y <= b.pos.y + b.height) ||
            (b.pos.y >= a.pos.y && b.pos.y <= a.pos.y + a.height) 
        ) && 
        (
            (a.pos.x >= b.pos.x && a.pos.x <= b.pos.x + b.width) || 
            (b.pos.x >= a.pos.x && b.pos.x <= a.pos.x + a.width)
        )
    );
}

Game.prototype.draw = function(){
    this.clear();
    this.drawStatus();
    this.drawLimits();
    this.player.draw(this.screen);
    this.ball.draw(this.screen);
    for(var i = 0; i < this.bricks.length; i++){
        this.bricks[i].draw(this.screen);
    }
};

Game.prototype.clear = function(){
    this.screen.fillStyle = "rgb(0,0,0)";
    this.screen.fillRect(0, 0, this.width, this.height);
};

Game.prototype.drawStatus = function () {
    this.screen.fillStyle = "rgb(255, 255, 255)";
    this.screen.font = "30px Consolas";
    this.screen.fillText("Ball:"+this.ballCount, 20, 30);
    this.screen.fillText(this.points, this.width/2, 30);
};

Game.prototype.drawLimits = function () {
    this.screen.fillStyle = "rgb(255, 255, 255)";
    this.screen.fillRect(5, 40, this.limits.right, 10);
    this.screen.fillRect(5, 40, 10, this.height);
    this.screen.fillRect(this.limits.right, 40, 10, this.height);
};

function createBricks () {
    var bricks = [];
    
    for(var i = 0; i < 13; i++){
        for(var j = 0; j < 6; j++){
            bricks.push(new Brick({x: 28+i*35, y: 65+j*20}));
        }
    }
    
    return bricks;
}