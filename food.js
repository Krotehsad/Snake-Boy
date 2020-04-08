class food {

  constructor() {
    this.x = random(width);
    this.y = random(45, height - 45);
    this.d = 10;
    this.r = random(10, 255);
    this.g = random(10, 255);
    this.b = random(10, 255);
  }

  show() {
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.d);
  }


  collide() {
    for (let i = 0; i < obstacleList.length; i++) {
      if (dist(this.x, this.y, player.x, player.y) <= (this.d)) {
        this.x = random(width);
        this.y = random(45, height - 65);
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
        score += difficulty * multiplier;
        snakeLength += 5;
      }
      else if ((dist(this.x, this.y, obstacleList[i].x, obstacleList[i].y)) <= (obstacleList[i].d / 2 + 5)) {
        this.x = random(width);
        this.y = random(45, height - 65);
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
      }
    }
  }
}