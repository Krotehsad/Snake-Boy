class snake{
  
    constructor() {
    this.x = width/2;
    this.y = height/2;
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
    this.x = (this.x + this.xs) + (this.xs * velocity/2);
    this.y = (this.y + this.ys) + (this.ys * velocity/2);
    }
    
    phase(){
      if(this.x > width){
      this.x = 0.5;  
      }  
      else if(this.x < 1){
      this.x = width - 0.5;
      }
      
      if(this.y > height){
      this.y = 0.5;
      }
      else if(this.y < 1){
      this.y = height - 0.5;
      }
    }
 
    grow(){
     if(dist(this.x, this.y, yimah.x, yimah.y) <= yimah.d){
     snakeLength += 5;
     velocity += 0.1;   
     }
    }
  
    currentLocs() { 
    if((currentLocX.length && currentLocY.length) < snakeLength){ 
      currentLocX.unshift(this.x);
      currentLocY.unshift(this.y); 
    }
    else if((currentLocX.length && currentLocY.length) == snakeLength){ 
      currentLocX.pop();
      currentLocY.pop();
      currentLocX.unshift(this.x);
      currentLocY.unshift(this.y); 
    }  
   }

}