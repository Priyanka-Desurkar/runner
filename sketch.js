var canvas
var backgroundImg,runnerAnimation,coinImg,obs1Img,obs2Img;
var runner
var coinS,runningS
var road
var coin
var gameoverImg,youwinImg,restartImg
var gameover,restart,youwin;
var PLAY = 1, END=0;
var gamestate = PLAY;
var score = 0
var back
var restart

function preload(){
backgroundImg = loadImage("cityy.png")
coinImg = loadImage("goldCoin.png")
obs1Img = loadImage("obstacle1.png")
obs2Img = loadImage("obstacle2.png")
road = loadImage("track.jpg")
gameoverImg = loadImage("GameOver.png")
youwinImg = loadImage("You win.png")
restartImg = loadImage("reset.png")

coinS = loadSound("Coin collection.mp3")
runningS = loadSound("Running.mp3")

runnerAnimation = loadAnimation("Runner1.png","Runner2.png","Runner3.png")
//skateAnimation = loadAnimation("Rskate1.png","Rskate2.png","Rskate3.png")
stuntAnimation = loadAnimation("Rstunt1.png","Rstunt2.png","Rstunt3.png")
runnerCollided = loadAnimation("Runner2.png")
}



function setup() {

canvas = createCanvas(windowWidth,windowHeight);

back = createSprite(windowWidth/2,windowHeight/2.9)
back.addImage(backgroundImg)
back.velocityX=-7

runner = createSprite(100,570,5,100);
runner.addAnimation("running", runnerAnimation);
runner.addAnimation("collided",runnerCollided);
runner.addAnimation("stunt",stuntAnimation);
runner.scale = 1;
runner.debug = true
runner.setCollider("circle",0,0,40)

coinG = createGroup()
obsG = createGroup()

gameover = createSprite(750,200,50,50)
gameover.addImage(gameoverImg)
gameover.scale = 1.5

restart = createSprite(750,450,505,50)
restart.addImage(restartImg)
restart.scale = .2



gameover.visible = false;
restart.visible = false;

score = 0;

edges = createEdgeSprites()


}

function draw() {
 
background("white");




  if(gamestate===PLAY){
  
    if(back.x<0){
      back.x =windowWidth
    }

    if(keyDown("space") && runner.y>=windowHeight/2){
      runner.velocityY = -10
    }
    runner.velocityY +=1

    // keyisdown("g")

  if(keyWentDown("s")){
    runner.changeAnimation('stunt');
  }
  if(keyWentUp("s")){
    runner.changeAnimation('running');
  }
  if(keyWentDown(RIGHT_ARROW)){
    runner.x +=10
    
  }
  coins();
  spawnObstacles();
 
 

  if (obsG.isTouching(runner)){
    gamestate = END;
  
  }

 else if(gamestate===END){
  gameover.visible = true;
  restart.visible = true
  runner.changeAnimation("collided")
  if(mousePressedOver(restart)){
    reset()
  }
  back.velocityX = 0
  coinG.setVelocityXEach(0)
  obsG.setVelocityXEach(0)

 }


  runner.collide(edges[3])
  runner.collide(edges[0])
  drawSprites();
  Score();
}
}


function coins(){
  if(World.frameCount%100===0){
    coin = createSprite(windowWidth,windowHeight-200);
    coin.addImage("moving",coinImg);
    coin.x = Math.round(random(100,1000));
    coin.y = Math.round(random(580,700))
    coin.velocityX = -4 
    coinG.add(coin);
    coin.scale = 0.1
}
}

function spawnObstacles(){
  if(World.frameCount%140===0){
    var obstacle = createSprite(windowWidth,windowHeight-200)
    obstacle.x = Math.round(random(100,1000))
    obstacle.y = Math.round(random(windowHeight- 150,windowHeight-50))

    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: obstacle.addImage(obs1Img)
              break;
      case 2: obstacle.addImage(obs2Img)
              break;
      default: break;
    }
    obstacle.scale = 0.04
    obstacle.velocityX= -4
    obstacle.lifetime = 150
    obsG.add(obstacle)
  }
}

function reset(){
 gamestate = PLAY
 gameover.visible = false
 restart.visible = false

 obsG.destroyEach();
 coinG.destroyEach();
 score = 0;
}
function Score()
{
         if(coinG.isTouching(runner))
         {
           score = score + 1;
         }
        textFont("algerian");
        textSize(30);
        fill("red");
        text("Score: "+ score, 250, 50);
       
  
}









/*var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided= loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
 
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);

  trex.scale = 0.5;
  trex.debug=true;
  trex.setCollider("circle",0,0,40);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END)
    {
      ground.velocityX = 0;
      trex.changeAnimation("collided", trex_collided);
      gameOver.visible = true;
      restart.visible = true;

     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);

     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     

     
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   obstacle.debug= true;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

*/