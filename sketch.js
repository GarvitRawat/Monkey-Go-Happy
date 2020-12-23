var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,random
var foodGroup, obstacleGroup
var score
var PLAY = 1
var END = 0
var gameState = PLAY
var current
var highestScore = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png") 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(500, 300)
  
  ground = createSprite(200, 280, 600, 20)
  
  monkey = createSprite(50, 240, 20, 20)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1
  
  obstacleGroup = new Group()
  foodGroup = new Group()
  
}


function draw() {
  background("white")
  
  //monkey.debug = true
  text("Survival Time: "+ score, 390, 20)
  
  if (gameState === PLAY){
    score = Math.ceil(frameCount/frameRate())
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (keyDown("space") && monkey.y >= 230){
        monkey.velocityY = -12
      }        
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END
    }
    
    createObstacle()
    spawnBananas()
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    fill("black")
    textSize(32)
    text("You Lose", 200, 150)
    textSize(15)
    text("Press R to restart", 200, 170)
    score = 0
    
    if (keyDown("r")){
        reset()
      }    
    
  }
  
  monkey.collide(ground)
    
  drawSprites()
  
}

function createObstacle(){
  
  if (frameCount % 60 === 0){
    obstacle = createSprite(600, 260, 20, 20)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.1
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.lifetime = 120
    obstacle.collide(ground)
    obstacleGroup.add(obstacle)
    //obstacle.debug = true
    obstacle.setCollider("circle", 0, 0, 220)
  }
  
 
}

function spawnBananas(){
  if (frameCount % 80 === 0){
    banana = createSprite(600, 190, 20, 20)
    banana.addImage(bananaImage)
    banana.lifetime = 120
    banana.scale = 0.1
    banana.velocityX = -5
    foodGroup.add(banana)
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
} 

function reset(){
    gameState = PLAY;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
}




