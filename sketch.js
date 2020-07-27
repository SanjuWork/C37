var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2;
var score = 0;

var gameOver,restart,gameOverImage,restartImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png");
  trex_collided = loadImage("trex_collided.png");
  
  //groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  //obstacle2 = loadImage("obstacle2.png");
  
  //gameOverImage = loadImage("gameOver.png");
  //restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(40,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.12;
  
  ground = createSprite(2000000000,190,100000000000000000000000000000000,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.shapeColor = "purple"
  
  /*gameOver = createSprite(300,100,10,10);
  //gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,140,10,10);
  //restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;*/
  
  invisibleGround = createSprite(200,188,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("skyblue");
  fill("red");

  if(gameState === PLAY){

    
    ground.velocityX = -3;
   
    score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
    camera.position.x=displayWidth/2
    camera.position.y=displayHeight/2
    trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = 500;
  }
   
    trex.collide(invisibleGround);
    
  spawnClouds();
    
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END; 
     // playSound("die.mp3");
    }
    
  }
  
  else if(gameState===END){
    
   // gameOver.visible = true;
   // restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityX = 0;
    trex.collide(invisibleGround);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.scale = 0.020

    trex.changeAnimation("collided",trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
   
  drawSprites();
  text("Score: "+ score, 500,50);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.15;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,1));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      //case 2: obstacle.addImage(obstacle2);
             // break;
      //default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.02;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  //gameOver.visible = false;
  //restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  count = 0;
  
}