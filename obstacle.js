class obstacle{

  constructor(){
  this.x = random(width);
  this.y = random(height);
  this.d = random(25, 150);
  this.r = 100;
  this.g = 100;
  this.b = 100;  
  }

  show(){
  for(let i = 0; i < difficulty; i++){  
  fill(this.r, this.g, this.b); 
  circle(obstacleLocX[i], obstacleLocY[i], obstacleDiameter[i]);
  }  
 }

  barrierCollide(target){
  for(let i = 0; i < difficulty; i++){   
   if(dist(obstacleLocX[i], obstacleLocY[i], target.x, target.y) <= obstacleDiameter[i]/2){
   gameOver = true;
   gamePlay = false;  
   }
  } 
 }
  
  engelInfo(){ 
    if((obstacleLocX.length && obstacleLocY.length) < difficulty){ 
      obstacleLocX.unshift(this.x);
      obstacleLocY.unshift(this.y);
      obstacleDiameter.unshift(this.d);
      console.log(obstacleLocX, obstacleLocY, obstacleDiameter);
    }
 
  }
}