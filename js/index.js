'use strict';

// setup canvas
let canvas = createCanvas('canvas1', 'default', 'background:#000');
canvas.fillStyle='rgb(255,255,255)';

// start fps log
let fpsLog = createLog('fpsLog');

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

  // setup
  let updatedX = 0;
  let updatedY = 0;
  let updatedSize = 0;

  // render method
  // called once per update by draw method
  this.render = () => {
    updatedX = (this.x - xCenter) * (focalLength / this.z);
    updatedX = updatedX + xCenter;

    updatedY = (this.y - yCenter) * (focalLength / this.z);
    updatedY = updatedY + yCenter;

    updatedSize = size * (focalLength / this.z);

    canvas.beginPath();
    canvas.fillStyle = "rgb(251, 237, 237)";
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


    if(this.y >= canvas.getHeight()){
      this.y = 0;
    }
    else if(this.y <= 0){
      this.y = random(0, canvas.getHeight());
    }

    if(this.z<=0){
      this.z = random(0, canvas.getWidth())*2;
    }
    else if(this.z >= canvas.getWidth()*2){
      this.z = 0;
    }

    if(this.x >= canvas.getWidth()){
      this.x = 0;
    }
    else if(this.x <= 0){
      this.x = random(0, canvas.getWidth());
    }
  }

  // movementHandler method
  // takes a string that indicates the movement direction
  // calls the move method with different increment parameters based off of assigned direction
  this.movementHandler = (direction) => {
    if(direction === "up"){
      move(-5, 0);
    }
    else if(direction === "down"){
      move(5, 0);
    }
    else if(direction === "left"){
      move(0, 2.5);
    }
    else if(direction === "right"){
      move(0, -2.5);
    }
  }

}

// draw method
// caleld by update
// renders all stars to the DOM
const draw = () => {
  canvas.clear();
  stars.forEach((s)=>{
    if(keyboardInput.up){
      s.movementHandler("up");
    }
    if(keyboardInput.down){
      s.movementHandler("down");
    }
    if(keyboardInput.left){
      s.movementHandler("left");
    }
    if(keyboardInput.right){
      s.movementHandler("right");
    }
    s.render();
  });
}

// update method
// called every game update
// this is the main game method
const update = () => {
  draw();
}

const handleMouseMovement = (mousePositions) => {
  verticalScroll = mousePositions[1];
  horizontalScroll = mousePositions[0];
}

setupMouseTracking(handleMouseMovement, canvas.getWidth()/2, canvas.getHeight()/2);

// start game loop
// updateCallback: update method defined above
// fpsCallback: arrow function that logs to fpsLog
gameUpdate(update, (fps)=>{
  fpsLog.write("FPS:" + fps);
});
