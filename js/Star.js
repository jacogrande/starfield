// setup
const numStars = 500;
let stars = new Array(numStars);
for(let i = 0; i < numStars; i++){
  stars[i] = new Star();
}

let focalLength = canvas.getWidth();
let xCenter = canvas.getWidth()/2;
let yCenter = canvas.getHeight()/2;
let size = 1;
let verticalScroll = 0;
let horizontalScroll = 0;

// create Star class
function Star(){

  // default position assigned randomly
  this.x = random(0, canvas.getWidth());
  this.y = random(0, canvas.getHeight());
  this.z = random(0, canvas.getWidth()) * 2;

  let alpha = canvas.getWidth() / this.z / 2;
  const color = "255,255,255,";

  // setup
  let updatedX = 0;
  let updatedY = 0;
  let updatedSize = 0;

  // render method
  // called once per update by draw method
  this.render = () => {
    alpha = canvas.getWidth() / this.z / 2;
    updatedX = (this.x - xCenter) * (focalLength / this.z);
    updatedX = updatedX + xCenter;

    updatedY = (this.y - yCenter) * (focalLength / this.z);
    updatedY = updatedY + yCenter;

    updatedSize = size * (focalLength / this.z);

    canvas.beginPath();
    canvas.fillStyle = "rgb(" + color + alpha + ")";
    canvas.arc(updatedX, updatedY, updatedSize, 0, Math.PI*2);
    canvas.fill();
  }

  // move method
  // called internally by movementHandler
  // takes movement increments and responds accordingly
  const move = (yInc, xInc)=>{
    this.z = this.z+yInc;
    this.x = this.x+xInc + (horizontalScroll*10);
    this.y = this.y+verticalScroll*10;

    // border resetting
    if(this.y >= canvas.getHeight()){
      this.y = 0;
    }
    else if(this.y <= 0){
      this.y = canvas.getHeight()-1;
    }

    if(this.z<=0){
      this.z = canvas.getWidth()*2;
    }
    else if(this.z >= canvas.getWidth()*2){
      this.z = 0;
      alpha = 0;
    }

    if(this.x >= canvas.getWidth()){
      this.x = 0;
    }
    else if(this.x <= 0){
      this.x = canvas.getWidth()-1;
    }
  }

  // movementHandler method
  // takes a string that indicates the movement direction
  // calls the move method with different increment parameters based off of assigned direction
  this.movementHandler = (direction) => {
    if(direction === "up"){
      move(-Ship.speed, 0);
    }
    else if(direction === "down"){
      move(Ship.speed, 0);
    }
    else if(direction === "left"){
      move(0, Ship.speed / 2);
    }
    else if(direction === "right"){
      move(0, -Ship.speed);
    }
  }

}
