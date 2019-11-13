
let difficulty = 1;
let width = 1280;
let height = 720;
let snakeLength = 0;
let currentLocX = [0];
let currentLocY = [0];
let obstacleLocX = [];
let obstacleLocY = [];
let obstacleDiameter = [];
let velocity = 0;
let score = 0;
let gameOver = false;
let gamePlay = false;
let title = true;


function setup() {
  createCanvas(width, height);
  player = new snake();
  yimah = new food();
  engel = new obstacle();
 } 
   
function keyPressed() {  
    if((keyCode === LEFT_ARROW) && (player.xs !== player.w)){
    player.xs = -player.w;
    player.ys = 0;
    }
    if((keyCode === RIGHT_ARROW) && (player.xs !== -player.w)){
    player.xs = player.w;
    player.ys = 0;
    }
    if((keyCode === DOWN_ARROW) && (player.ys !== -player.w)){
    player.ys = player.w;   
    player.xs = 0;
    }
    if((keyCode === UP_ARROW) && (player.ys !== -player.w)){
    player.ys = -player.w;   
    player.xs = 0;
    }     
    if(keyCode === 32){ 
    resetGameplay(); 
    }
    if(keyCode === 49){ 
    difficulty = 1;
    } 
    if(keyCode === 50){ 
    difficulty = 2;
    } 
    if(keyCode === 51){ 
    difficulty = 3;
    } 
    if(keyCode === 52){ 
    difficulty = 4;
    } 
    if(keyCode === 53){ 
    difficulty = 5;
    } 
    //console.log("snakeLength" + " " + snakeLength, "LocX" + " " + currentLocX, "LocY" + " " + currentLocY);   
   }


function drawGamePlay(){ 
  
  frameRate(30);
  for(let i = 1; i < currentLocX.length; i++){
  fill(255, 255 ,255);
  rectMode(CENTER);
  noStroke();  
  rect(currentLocX[i], currentLocY[i], player.w, player.h);
  }
  
  engel = new obstacle();
  score = snakeLength*2;
  
  yimah.show();
  yimah.move();
  player.show();
  player.move();
  player.grow();
  player.phase();
  player.currentLocs();
  engel.show();
  engel.barrierCollide(player);
  engel.engelInfo(); 
}

function resetGameplay(){
    player.xs = 0;  
    player.ys = 0;
    player.x = width/2;
    player.y = height/2;
    yimah.x = Math.floor(random(width));
    yimah.y = Math.floor(random(height));
    snakeLength = 0;
    score = 0;
    currentLocX = [0];
    currentLocY = [0];  
    velocity = 0;
    gamePlay = false;
    gameOver = false;
    title = true;
    obstacleLocX = [];
    obstacleLocY = [];
    obstacleDiameter = [];   
}

function drawGameOver(){
  fill(255, 0, 0);
  textSize(100);
  textAlign(CENTER);  
  text("Game Over", width/2, height/2); 
  
  fill(255, 0, 0);
  textSize(25);
  textAlign(CENTER);  
  text("Your Score" + " " + "=" + " " + score , width/2 , height/2 + 50); 
  textSize(20);
  textAlign(CENTER);
  text("Press space to try again!", width/2, height/2 + 70); 
}

function titleScreen(){  
  
  fill(255, 0, 0);
  textSize(250);
  textAlign(CENTER); 
  text("Snek Boy!", width/2, height/2);
  
  fill(255, 0, 0);
  textSize(20);
  textAlign(CENTER);
  text("Click the screen to start!", width/2, height/2 + 55);
  
  
  fill(255, 0, 0);
  textSize(20);
  textAlign(CENTER);
  text("Difficulty :" + " " + difficulty, width/2, height/2 + 80);
  
  
  fill(150, 200, 0);
  textSize(15);
  textAlign(CENTER);
  text("Keys : (Arrow keys to choose direction), (number keys 1,2,3,4,5 for difficulty), (space bar to return to title)."  , width/2, height/2 + 280);
} 
   
function mousePressed() {
   if(title == true && gameOver == false){
   gamePlay = true; 
  }  
 }


function draw() {
  background(0, 0, 0);
  frameRate(23);
  fill(255, 0, 0);
  textSize(20);
  textAlign(CENTER);
  text("Score:" +" "+ score, width - 90, height - 690);
  
  
  for(let z = 1; z < currentLocX.length; z++){
  if(dist(player.x, player.y, currentLocX[z], currentLocY[z]) <= player.w){
  gameOver = true;
  gamePlay = false;
  title = false;  
  } 
 }
 
  if(gamePlay == false && gameOver == false){ 
  titleScreen();
  } 
  else if(gamePlay == true){
  drawGamePlay();
  }
  else if(gameOver == true && gamePlay == false){
  drawGameOver();
  }
}

 

