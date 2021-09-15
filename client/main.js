var cursors;
var knight;
var crates;
var coinTimer;
var hitBlaster;
var fallingKnight;
var gameSound;
var mushroomTimer1;

var score = 0;
var scoreText;

var secondsLeft = 30;
var timeLeftText;
var timeLeftTimer;

var gameOver = false;

var configure = {
    height: 600,
    width: 1000,
    parent: 'phaser-example',
    type: Phaser.AUTO,
    scene: {
        preload: gamePreload,
        create: gameCreate,
        update: gameUpdate
    },
    physics: {
       default: "arcade",
       arcade: {
           gravity: {
               y:800
           },
           debug: false
       }
    }

}

function gamePreload(){
this.load.image("knight","assets/img/knight.png");
this.load.image('crate','assets/img/crate.png');
this.load.image('background','assets/img/pexels.jpg');

// loading sound on collision
this.load.audio('blaster','assets/sounds/p-ping.mp3');

//loading sound for fall
this.load.audio('falling','assets/sounds/falling.mp3');

//loading sound for background
this.load.audio('backgroundSound','assets/sounds/splash.mp3');

//loading coin
this.load.image('coin','assets/img/bitcoin.png');

//loading mushrooms
this.load.image('mushroom1','assets/img/mushroom1.png');
this.load.image('mushroom2','assets/img/mushroom2.png');

//loading the run animation frame
this.load.image('run_frame_1','assets/img/knight/run/Run (1).png');
this.load.image('run_frame_2','assets/img/knight/run/Run (2).png');
this.load.image('run_frame_3','assets/img/knight/run/Run (3).png');
this.load.image('run_frame_4','assets/img/knight/run/Run (4).png');
this.load.image('run_frame_5','assets/img/knight/run/Run (5).png');
this.load.image('run_frame_6','assets/img/knight/run/Run (6).png');
this.load.image('run_frame_7','assets/img/knight/run/Run (7).png');
this.load.image('run_frame_8','assets/img/knight/run/Run (8).png');
this.load.image('run_frame_9','assets/img/knight/run/Run (9).png');
this.load.image('run_frame_10','assets/img/knight/run/Run (10).png');

//loading the idle animation frame
this.load.image('idle_frame_1','assets/img/knight/idle/Idle (1).png');
this.load.image('idle_frame_2','assets/img/knight/idle/Idle (2).png');
this.load.image('idle_frame_3','assets/img/knight/idle/Idle (3).png');
this.load.image('idle_frame_4','assets/img/knight/idle/Idle (4).png');
this.load.image('idle_frame_5','assets/img/knight/idle/Idle (5).png');
this.load.image('idle_frame_6','assets/img/knight/idle/Idle (6).png');
this.load.image('idle_frame_7','assets/img/knight/idle/Idle (7).png');
this.load.image('idle_frame_8','assets/img/knight/idle/Idle (8).png');
this.load.image('idle_frame_9','assets/img/knight/idle/Idle (9).png');
this.load.image('idle_frame_10','assets/img/knight/idle/Idle (10).png');
}

function gameCreate(){
   
    //create background
    this.add.image(500,375,'background');

    //create knight
    knight = this.physics.add.sprite(200,100,'knight');
    knight.body.setSize(200,600,20,0)
    knight.scaleX = 0.15;
    knight.scaleY = knight.scaleX;
    // knight.sfx = {};
    // knight.sfx.collide = game.add.audio('blaster');
    hitBlaster = this.sound.add('blaster');
    fallingKnight = this.sound.add('falling');
    gameSound = this.sound.add('backgroundSound');
    gameSound.play();
    
    //create run animation
    this.anims.create({
        key: 'knight_run',
        frames: [
            {key: 'run_frame_1'},
            {key: 'run_frame_2'},
            {key: 'run_frame_3'},
            {key: 'run_frame_4'},
            {key: 'run_frame_5'},
            {key: 'run_frame_6'},
            {key: 'run_frame_7'},
            {key: 'run_frame_8'},
            {key: 'run_frame_9'},
            {key: 'run_frame_10'}
        ],
        frameRate: 10,
        repeat: 1
    });

    //create knight idle animation
    this.anims.create({
        key: 'knight_idle',
        frames: [
            {key: 'idle_frame_1'},
            {key: 'idle_frame_2'},
            {key: 'idle_frame_3'},
            {key: 'idle_frame_4'},
            {key: 'idle_frame_5'},
            {key: 'idle_frame_6'},
            {key: 'idle_frame_7'},
            {key: 'idle_frame_8'},
            {key: 'idle_frame_9'},
            {key: 'idle_frame_10'}
        ],
        frameRate: 10,
        repeat: 1
    });


    //setting value for score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '27px', fill: '#fff' });
    timeLeftText = this.add.text(500, 16, '00:30', { fontSize: '27px', fill: '#fff' });

    //create crate left floor
    crates = this.physics.add.staticGroup();
    crates.create(40,562,'crate');
    crates.create(117,562,'crate');
    crates.create(194,562,'crate');
    crates.create(271,562,'crate');
    crates.create(348,562,'crate');
    

    //platform 1
    crates.create(450,385,'crate');
    
    //platform 2
    crates.create(700,385,'crate');

    //platform 3
    crates.create(570,220,'crate');
    
    //platform 4
    crates.create(830,220,'crate');
    
    //platform 5
    crates.create(960,385,'crate');
   
    //right floor
    crates.create(960,562,'crate');
    crates.create(883,562,'crate');

    this.physics.add.collider(crates,knight);

    cursors = this.input.keyboard.createCursorKeys();
    
    coinTimer = this.time.addEvent({
        delay: Phaser.Math.Between(1000,3000),
        callback: generateCoins,
        callbackScope: this,
        repeat: -1
    });
    
    mushroomTimer1 = this.time.addEvent({
        delay: Phaser.Math.Between(1000,5000),
        callback: generateMushroom1,
        callbackScope: this,
        repeat: -1
    });

    timeLeftTimer = this.time.addEvent({
        delay: 1000,
        callback: updateTimeLeft,
        callbackScope: this,
        repeat: -1
    });
   
}

function generateCoins(){
    var coins = this.physics.add.group({
       key: "coin",
       repeat: 1,
       setXY: {
           x: Phaser.Math.Between(0,960),
           y: -100,
           stepX: Phaser.Math.Between(30,100)
       }
    });

    coins.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });
    this.physics.add.collider(crates,coins);
    this.physics.add.overlap(knight, coins, collectCoin, null, this);
   
}

function generateMushroom1(){
    var mushrooms = this.physics.add.group({
        key: "mushroom1",
        repeat: 0,
        setXY: {
            x: Phaser.Math.Between(0,960),
            y: -100,
            stepX: Phaser.Math.Between(30,100)
        }
     });

     mushrooms.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 1.8));
    
    });
    this.physics.add.collider(crates,mushrooms);
    this.physics.add.overlap(knight, mushrooms, collectMushroom, null, this);
}

function updateTimeLeft(){
    if(gameOver) return;
    secondsLeft --;
    if(secondsLeft < 10){
        timeLeftText.setText('00:0' + secondsLeft);
    }
    else{
        timeLeftText.setText('00:' + secondsLeft);
    }
    
    if(secondsLeft <= 0){
        this.physics.pause();
        gameSound.stop();
        gameOver = true;
    }
    if(knight.y > 562){  
        fallingKnight.play();
        this.physics.pause();
        gameSound.stop();
        gameOver = true;
    }

}

function collectCoin (knight, coin)
{
    coin.disableBody(true, true);
    hitBlaster.play();
    score ++;
    scoreText.setText('Score: ' + score);
}

function collectMushroom(knight,mush){
    mush.disableBody(true, true);
    hitBlaster.play();
    score = score + 10;
    scoreText.setText('Score: ' + score);
}

function gameUpdate(){
    if(cursors.left.isDown){
        knight.setVelocityX(-200);
        knight.anims.play('knight_run', true);
        knight.flipX = true;
    }
    else if(cursors.right.isDown){
        knight.setVelocityX(200);
        knight.anims.play('knight_run', true);
        knight.flipX = false;
    }
    else{
        knight.setVelocityX(0);
        knight.anims.play('knight_idle', true);
    }
    if (cursors.up.isDown && knight.body.touching.down){
        knight.setVelocityY(-600);
    }
    

}

var game = new Phaser.Game(configure);
