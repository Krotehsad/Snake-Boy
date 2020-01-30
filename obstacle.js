class obstacle {

  constructor() {
    this.x = random(175, width - 175);
    this.y = random(175, (height - 175));
    this.d = random(25, 225);
    this.r = 100;
    this.g = 100;
    this.b = 100;
  }

  show() {
    for (let i = 0; i < obstacleList.length; i++) {
      fill(this.r, this.g, this.b);
      circle(obstacleList[i].x, obstacleList[i].y, obstacleList[i].d);
    }
  }

  collideWith(target) {

    for (let i = 0; i < obstacleList.length; i++) {

      if ((target === player) && (dist(obstacleList[i].x, obstacleList[i].y, target.x, target.y) <= obstacleList[i].d / 2 + 3) && (spawn)) {
        gameOver = true;
        gamePlay = false;
        title = false;
      }
      else if ((target === player) && (dist(obstacleList[i].x, obstacleList[i].y, target.x, target.y) <= obstacleList[i].d / 2 + 5) && (!spawn)) {
        gameOver = false;
        gamePlay = true;
        title = false;
        obstacleList[i].x = random(175, (width - 175));
        obstacleList[i].y = random(175, (height - 175));
      }
      else if ((target === rocks) && (dist(obstacleList[i].x, obstacleList[i].y, target.x, target.y) <= obstacleList[i].d / 2 + 5) && (!spawn)) {
        gameOver = false;
        gamePlay = true;
        title = false;
        obstacleList[i].x = random(175, (width - 175));
        obstacleList[i].y = random(175, (height - 175));
      }
    }
  }

  rocksInfo() {
    if ((obstacleList.length) < difficulty) {
      obstacleList.push(new obstacle());
    }
  }
}