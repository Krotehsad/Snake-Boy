let difficulty = 1;
let width = 1280;
let height = 720;
let snakeLength = 0;

// THIS VARIABLE EXISTS TO ESTABLISH A COOLDOWN TIMER FOR DIRECTION KEY INPUTS //
let keyIsOnCooldown = false;

// THIS ARRAY IS HERE TO CREATE OBSTACLES IN //
let obstacleList = [];

// THIS ARRAY IS HERE TO CREATE AND DRAW A SNAKE TAIL IN MOTION //  
let currentLocs = [];

// THIS VARIABLE IS USED TO GRADUALLY INCREASE THE MOVEMENT SPEED OF THE SNAKE //
let score = 0;
let multiplier = 1;
let gameSpeed = 19;

let gameOver = false;
let gamePlay = false;
let title = true;

// THIS VARIABLE EXISTS TO DETERMINE WHEN OBSTACLE COLLISIONS SHOULD RESULT IN A 'GAME OVER' AND TO MANAGE SCORE MULTIPLIER. //
let spawn = false;

function setup() {
  createCanvas(width, height);

  // SNAKE AND FOOD INSTANCES ARE CREATED WHEN THE PROGRAM RUNS //
  player = new snake();
  nutrient = new food();
}

// GAMEPLAY LOOP //
function drawGamePlay() {
  gameSpeed = 20 + multiplier;
  frameRate(gameSpeed);

  //THIS LOOP DRAWS THE TAIL OF THE SNAKE USING THE ARRAY SPECIFIED BELOW//
  for (let i = 1; i < currentLocs.length; i++) {
    fill(255, 255, 255);
    rectMode(CENTER);
    noStroke();
    rect(currentLocs[i-1].x, currentLocs[i-1].y, currentLocs[i-1].w, currentLocs[i-1].h);
  }



  // THIS FUNCTION SETS THE NUMBER OF OBSTACLES CREATED ACCORDING TO 'difficulty' VARIABLE //
  rocks.rocksInfo();
  rocks.show();

  nutrient.show();
  nutrient.collide();

  player.show();
  player.move();

  // THIS FUNCTION ALLOWS SNAKE TO GO THROUGH THE EDGE OF THE PLAY AREA AND COME OUT FROM THE OTHER SIDE //
  player.phase();

  // THIS FUNCTION CONSTANTLY UPDATES 'currentLocs' ARRAY WHILE KEEPING THE ARRAY LENGTHS EQUAL TO THE SNAKE LENGTH. // 
  player.currentLocs();

  rocks.show();

  // COLLISION FUNCTION FOR OBSTACLES //
  rocks.collideWith(player);
  rocks.collideWith(rocks);
  
  // USE 'spawn' VARIABLE TO DETERMINE WETHER TO INCREASE SCORE MULTIPLIER //
  if (spawn) {
    multiplier = snakeLength / 5;
  }

  noFill();
  rectMode(CENTER);
  rect(width / 2, height, width, 70);
  stroke(255, 0, 255);
}

// THIS IS A FUNCTION TO RESET GAMEPLAY, SCORE AND SCORE MULTIPLIER. //
function resetGameplay() {
  player.xs = 0;
  player.ys = 0;
  player.x = width / 2;
  player.y = height / 2;
  nutrient.x = random(width);
  nutrient.y = random(0, height - 45);
  snakeLength = 0;
  multiplier = 1;
  score = 0;
  currentLocs = [];
  velocity = 0;
  gamePlay = false;
  gameOver = false;
  title = true;
  spawn = false;
  obstacleList = [];
}

// GAME OVER SCREEN //
function drawGameOver() {
  noStroke();
  fill(255, 0, 0);
  textSize(100);
  textAlign(CENTER);
  text("Game Over", width / 2, height / 2);

  fill(255, 0, 0);
  textSize(25);
  textAlign(CENTER);
  text("Your Score" + " " + "=" + " " + score, width / 2, height / 2 + 50);
  textSize(20);
  textAlign(CENTER);
  text("Press space to try again!", width / 2, height / 2 + 70);
  spawn = false;
  multiplier = 1;
}

// TITLE SCREEN //
function titleScreen() {
  noStroke();
  fill(255, 0, 0);
  textSize(250);
  textAlign(CENTER);
  text("Snek Boy!", width / 2, height / 2);

  fill(255, 0, 0);
  textSize(20);
  textAlign(CENTER);
  text("Click the screen to start!", width / 2, height / 2 + 55);

  fill(255, 0, 0);
  textSize(20);
  textAlign(CENTER);
  text("Difficulty :" + " " + difficulty, width / 2, height / 2 + 80);

  fill(150, 200, 0);
  textSize(15);
  textAlign(CENTER);
  text("Keys : (Arrow keys to choose direction), (number keys 1,2,3,4,5 for difficulty), (space bar to return to title).", width / 2, height / 2 + 280);
  multiplier = 1;
  spawn = false;
}

// MOUSE CLICK TO START GAME ON TITLE SCREEN //
function mousePressed() {
  if (title) {
    gamePlay = true;
    title = false;

    // OBSTACLE INSTANCES ARE CREATED WHEN THE GAMEPLAY LOOP BEGINS RUNNING //
    rocks = new obstacle();
  }
}


function draw() {
  background(0, 0, 0);
  frameRate(23);
  noStroke();
  fill(255, 0, 0);
  textSize(20);
  textAlign(CENTER);
  text("Score:" + " " + score, width - 70, height - 10);

  noStroke();
  fill(0, 255, 0);
  textSize(20);
  textAlign(CENTER);
  text("Multiplier:" + " " + multiplier, width - 270, height - 10);
  
  // FPS COUNTER //
  // noStroke();
  // fill(0, 0, 255);
  // textSize(20);
  // textAlign(CENTER);
  // text("FPS:" + " " + gameSpeed, 50, height - 10);


  // THIS DETECTS COLLISION BETWEEN SNAKE HEAD AND TAIL AND RESULTS IN 'GAME OVER' IF IT DOES. //
  // 'currentLocs.length - 1'
  for (let i = 1; i < currentLocs.length - 1; i++) {
    if (dist(player.x, player.y, currentLocs[i].x, currentLocs[i].y) <= player.w / 2 + 1) {
     gameOver = true;
     gamePlay = false;
     title = false;
   }
  }

  // THIS EXPRESSION IS HERE TO ADD A COOLDOWN TO DIRECTION INPUTS TO PREVENT THE SNAKE FROM CHANGING DIRECTION TWICE IN THE SAME FRAME //
  if (keyIsOnCooldown) {

    // IF 'keyIsOnCooldown' RETURNS 'FALSE' A BASIC EXPRESSION IS EXECUTED BY 'setTimeout()' TO CHANGE THE VALUE OF 'keyIsOnCooldown' VARIABLE FROM 'TRUE' TO 'FALSE' IN 10 MILISECONDS //
    setTimeout(() => keyIsOnCooldown = false, 10);
  }

  // DIFFERENT GAME STATES ARE EXECUTED BY THE CODE BELOW //
  if (!gamePlay && !gameOver) {
    titleScreen();
  }
  else if (gamePlay && !gameOver) {
    drawGamePlay();
  }
  else if (gameOver && !gamePlay) {
    drawGameOver();
  }
  
  noFill();
  stroke(255, 0, 255);
  rectMode(CENTER);
  rect(width / 2, height, width, 70);

}


// KEY CODES FOR DIRECTIONS, DIFFICULTY AND RETURNING TO THE TITLE SCREEN. MANIPULATES 'spawn' VARIABLE SO THE SCORE MULTIPLIER STARTS COUNTING WHEN THE GAME BEGINS AND THE 'keyIsOnCooldown' VARIABLE TO ESTABLISH A COOLDOWN TIME ON DIRECTION INPUT //
function keyPressed() {
  
  let movingRight = (player.xs >= player.w);
  let movingLeft = (player.xs <= -player.w);
  let movingUp = (player.ys <= -player.w);
  let movingDown = (player.ys >= player.w);

  if (keyIsOnCooldown) {
    return;
  }

  if (spawn) {
    if ((keyCode === LEFT_ARROW) && (!movingRight)) {
      player.xs = -player.w;
      player.ys = 0;
      keyIsOnCooldown = true;
    }

    if ((keyCode === RIGHT_ARROW) && (!movingLeft)) {
      player.xs = player.w;
      player.ys = 0;
      keyIsOnCooldown = true;
    }

    if ((keyCode === DOWN_ARROW) && (!movingUp)) {
      player.ys = player.w;
      player.xs = 0;
      keyIsOnCooldown = true;
    }

    if ((keyCode === UP_ARROW) && (!movingDown)) {
      player.ys = -player.w;
      player.xs = 0;
      keyIsOnCooldown = true;
    }
  }

  else {
    if ((keyCode === LEFT_ARROW) && (!movingRight)) {
      player.xs = -player.w;
      player.ys = 0;
      spawn = true;
      keyIsOnCooldown = true;
    }

    if ((keyCode === RIGHT_ARROW) && (!movingLeft)) {
      player.xs = player.w;
      player.ys = 0;
      spawn = true;
      keyIsOnCooldown = true;
    }

    if ((keyCode === DOWN_ARROW) && (!movingUp)) {
      player.ys = player.w;
      player.xs = 0;
      spawn = true;
      keyIsOnCooldown = true;
    }

    if ((keyCode === UP_ARROW) && (!movingDown)) {
      player.ys = -player.w;
      player.xs = 0;
      spawn = true;
      keyIsOnCooldown = true;
    }
  }


  if (keyCode === 32) {
    resetGameplay();
    spawn = false;
    multiplier = 1;
  }

  if ((keyCode === 49) && (title)) {
    difficulty = 1;
    multiplier = 1;
  }

  if ((keyCode === 50) && (title)) {
    difficulty = 2;
    multiplier = 1;
  }

  if ((keyCode === 51) && (title)) {
    difficulty = 3;
    multiplier = 1;
  }

  if ((keyCode === 52) && (title)) {
    difficulty = 4;
    multiplier = 1;
  }

  if ((keyCode === 53) && (title)) {
    difficulty = 5;
    multiplier = 1;
  }
}


