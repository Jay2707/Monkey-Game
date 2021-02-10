var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var score = 0;
var survivalTime = 0;

function preload(){
 
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600,400);
  
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1500,10);
  ground.x = ground.width/2;
  

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime=0;
  score = 0;
  
}



function draw() {
//monkey.debug = true;
  background(400);

  
  if(gameState == PLAY){
  score = score + Math.round(getFrameRate()/60);
  text("Score :" + score,500,50);
  stroke("black");
  textSize(20);
  fill("black");
  
  survivalTime = Math.ceil(frameCount/frameRate());  
  text("Survival Time :" + survivalTime,100,50);
  stroke("white");
  textSize(20);
  fill("white");
  
  
  ground.velocityX = -(4 + score/100);  
  
  if(keyDown("space") && monkey.y >= 210) {
      monkey.velocityY = -12;
  } 
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(ground.x < 0){
    ground.x = ground.width/2;
  }
    monkey.collide(ground);
    
    food();
    obstacle();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  else if (gameState == END){
   //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);    
  }  
  
  drawSprites();
}

function food(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

function obstacle(){
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,310,40,10);
    //obstacle.debug = true;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
    
  }
}
