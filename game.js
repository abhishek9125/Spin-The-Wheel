let result = {
    count: 12,
    discount: ["1% off","2% off","3% off","4% off","5% off","6% off",
               "7% off","8% off","9% off","10% off","11% off","12% off"]
}

let config = {
    type : Phaser.CANVAS,
    width : 800,
    height: 370,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload, // Called Once
        create : create,   // Called Once
        update : update,   // Called Infinitely
    }
   
};

let game = new Phaser.Game(config);

function preload(){
    this.load.image('Background','Assets/back.jpg');  //Loading Images
    this.load.image('Wheel','Assets/wheel.png');
    this.load.image('Pin','Assets/pin.png');
    this.load.image('Stand','Assets/stand.png'); 
}

function create(){
    
    let W = game.config.width;
    let H = game.config.height;
    let background = this.add.sprite(0,0,'Background'); //Create Image background on Canvas, using W,H as co-ordinates as this                   function takes center of image as co-ordinate and we will see only 4th quadrant from centre.
    background.setPosition(W/2,H/2);
    background.setScale(0.2);
    
    let stand = this.add.sprite(W/2,H/2+125,'Stand'); //Ordering Matters: Bottom one in front and top one at back.
    stand.setScale(0.13);
    
    let pin = this.add.sprite(W/2,H/2-110,'Pin');
    pin.setScale(0.12);
    pin.depth = 1; // Higher Depth means in front, by default depth is 0 for all elements

    this.wheel = this.add.sprite(W/2,H/2,'Wheel'); // Makes it property of Scene and can be used in other functions
    this.wheel.setScale(0.2);
    
    this.input.on('pointerdown',spinwheel,this); // Eventlistener for Mouse Click
    font_style = {
        font: "Bold 20px Roboto",
        align: "center"
    }
    
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win..",font_style);
}

// Identical to gameloop function
function update(){          // Update is a property of scene and wheel can be used now
//    this.wheel.angle += 1;
//  this.wheel.alpha -= 0.001;   // Reduces Opacity of wheel
    
}

function spinwheel(){
    this.game_text.setText("Cross your Fingers..!!");   //Text Updated after clicking the mouse
    
    let rounds = Phaser.Math.Between(2,4); // Integer between 2 and 5
    let degrees = Phaser.Math.Between(0,11)*15;
    
    let total_angle = rounds*360 + degrees;
    
    let index = result.count - 1 - Math.floor(degrees/(360/result.count));
    
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 3000,
        callbackScope: this,
        onComplete: function(){
            this.game_text.setText("You Won " + result.discount[index]);
        }
    });
}
