class snake {

  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.w = 10;
    this.h = 10;
    this.xs = 0;
    this.ys = 0;
  }

  show() {
    fill(255, 255, 255);
    rectMode(CENTER);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    this.x = (this.x + this.xs); 
    this.y = (this.y + this.ys);
  }
  
  // THIS IS THE FUNCTION WHICH ALLOWS THE SNAKE TO GO THROUGH ONE SIDE OF THE SCREEN AND COME OUT FROM THE OPPOSITE SIDE //
  phase() {
    if (this.x > width) {
      this.x = 0.5;
    }
    else if (this.x < 1) {
      this.x = width - 0.5;
    }
    if (this.y > height - 40) {
      this.y = 0.5;
    }
    else if (this.y < 1) {
      this.y = height - 40;
    }
  }

  // THIS FUNCTION PUSHES THE CURRENT LOCATION OF THE SNAKE INTO AN ARRAY A NUMBER OF TIMES EQUAL TO THE 'snakeLength' VARIABLE. //
  // 'currentLocs' ARRAY IS THEN USED TO DRAW THE MOVING TAIL OF THE SNAKE. //
  currentLocs() {
    if (currentLocs.length < snakeLength) {
      currentLocs.unshift( { x: this.x, y: this.y, w: this.w, h: this.h, xs: this.xs, ys: this.ys});
    }
    else if (currentLocs.length == snakeLength) {
      currentLocs.pop();
      currentLocs.unshift( { x: this.x, y: this.y, w: this.w,h: this.h, xs: this.xs, ys: this.ys});
    }
  }

}