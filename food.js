class food {

  constructor(){
  this.x = Math.floor(random(width));
  this.y = Math.floor(random(height));
  this.d = 10;
  this.r = random(0,255);
  this.g = random(0,255);
  this.b = random(0,255);  
  }

  show(){
  fill(this.r, this.g, this.b); 
  circle(this.x, this.y, this.d);
  }  

  move(){
  
  for(let i = 0; i < difficulty; i++){
  if((dist(this.x, this.y, player.x, player.y) <= this.d) || (dist(this.x, this.y, obstacleLocX[i], obstacleLocY[i]) <= obstacleDiameter[i]/2 + 10)){
   this.x = Math.floor(random(width));
   this.y = Math.floor(random(height));
   this.r = random(0,255);
   this.g = random(0,255);
   this.b = random(0,255);
   } 
  }
   //console.log("snakeLength" + " " + snakeLength, "LocX" + " " + currentLocX, "LocY" + " " + currentLocY);   
 } 
}
