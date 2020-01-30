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
    this.x = (this.x + this.xs) + (this.xs * velocity / 2);
    this.y = (this.y + this.ys) + (this.ys * velocity / 2);
  }

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

  grow() {
    if (dist(this.x, this.y, nutrient.x, nutrient.y) <= nutrient.d) {
      snakeLength += 5;
      velocity += 0.1;
    }
  }

  currentLocs() {
    if (currentLocs.length < snakeLength) {
      currentLocs.unshift( { x: this.x, y: this.y, w: this.w,h: this.h});
    }
    else if (currentLocs.length == snakeLength) {
      currentLocs.pop();
      currentLocs.unshift( { x: this.x, y: this.y, w: this.w,h: this.h});
    }
  }

}