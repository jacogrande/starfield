// setup
let focalLength = canvas.getWidth();
let xCenter = canvas.getWidth()/2;
let yCenter = canvas.getHeight()/2;
let starSize = 1;
let verticalScroll = 0;
let horizontalScroll = 0;
let harvestableStar = null;
let harvestableStarArray = [];


// create Star class
function Star(){

  // default position assigned randomly
  this.x = random(0, canvas.getWidth());
  this.y = random(0, canvas.getHeight());
  this.z = random(0, canvas.getWidth()) * 2;
  this.appendedHub = null;

  let scaleReducer = random(0.75, 1);

  this.power = random(0, 1);
  let color = "";
  if(this.power < 0.25){
    scaleReducer = random(1.5,2.5);
    color = "225, 225, 150,"
  }
  else if(this.power < 0.98) {
    color = "255,255,255,";
  }
  else{
    color = "162, 255, 252,";
    scaleReducer = random(0.25,0.75);
  }

  let alpha = canvas.getWidth() / this.z / 2;
  let alphaMod = 0;

  // setup
  let updatedX = 0;
  let updatedY = 0;
  let updatedSize = 0;
  let resetting = false;
  this.harvested = false;

  // get methods
  this.getSize = ()=>{
    return updatedSize;
  }

  this.getColor = ()=>{
    return color;
  }

  // render method
  // called once per update by draw method
  this.render = () => {
    if(this.z > 0 && this.z < 30
      && this.x > canvas.getWidth()/3 && this.x < canvas.getWidth()*2/3
      && this.y > canvas.getHeight()/3 && this.y < canvas.getHeight()*2/3){
      if(harvestableStarArray.indexOf(this) == -1){
        harvestableStarArray.push(this);
      }

      if(mouseX > this.x - 100 && mouseX < this.x+updatedSize + 100 && mouseY > this.y - 250 && mouseY < this.y+updatedSize+100){
        this.renderAura();
        harvestableStar = this;
      }

    }
    else{
      if(harvestableStarArray.indexOf(this) != -1){
        harvestableStarArray.splice(harvestableStarArray.indexOf(this),1);
      }
    }
    updatedX = (this.x - xCenter) * (focalLength / this.z);
    updatedX = updatedX + xCenter;

    updatedY = (this.y - yCenter) * (focalLength / this.z);
    updatedY = updatedY + yCenter;

    updatedSize = starSize * (focalLength / this.z) / scaleReducer;

    if(resetting){
      alpha = 1;
      alphaMod+=0.01;
      if(alpha <= 0){
        reset();
      }
    }
    else{
      alpha = canvas.getWidth() / this.z / 2;
    }

    canvas.beginPath();
    canvas.fillStyle = "rgba(" + color + (alpha-alphaMod) + ")";
    canvas.arc(updatedX, updatedY, updatedSize, 0, Math.PI*2);
    canvas.fill();
  }

  this.renderAura = () => {
    harvestableStar = this;
    canvas.beginPath();
    canvas.strokeStyle = "rgb(162, 57, 126)";
    canvas.lineWidth = 10;
    canvas.arc(updatedX, updatedY, updatedSize, 0, Math.PI*2);
    canvas.stroke();
  }

  const reset = () => {
    // default position assigned randomly
    this.x = random(0, canvas.getWidth());
    this.y = random(0, canvas.getHeight());
    this.z = random(0, canvas.getWidth()) * 2;
    this.appendedHub = null;

    scaleReducer = random(0.75, 1);

    this.power = random(0, 1);
    if(this.power < 0.25){
      scaleReducer = random(1.5,2.5);
      color = "225, 225, 150,"
    }
    else if(this.power < 0.98) {
      color = "255,255,255,";
    }
    else{
      color = "162, 255, 252,";
      scaleReducer = random(0.25,0.75);
    }

    alpha = canvas.getWidth() / this.z / 2;

    // setup
    updatedX = 0;
    updatedY = 0;
    updatedSize = 0;
    resetting = false;
    this.harvested = false;
  }

  this.getHarvestValue = () => {
    return 100 * scaleReducer * this.power;
  }

  this.harvest = () => {
    resetting = true;
    this.harvested = true;
    return 100 * scaleReducer * this.power * Ship.fuelProcessingRate;
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

// initialization
const numStars = 500;
let stars = new Array(numStars);
for(let i = 0; i < numStars; i++){
  stars[i] = new Star();
}


const harvestStar = () => {
  starLog.write("");
  let finalStarArray = [];
  harvestableStarArray.forEach((s)=>{
    if(mouseX > s.x - 250 && mouseX < s.x+s.getSize() + 100 && mouseY > s.y - 250 && mouseY < s.y+s.getSize()+100){
      finalStarArray.push(s);
    }
  });

  let superiorStar = finalStarArray[0];
  finalStarArray.forEach((s)=>{
    if(s.z > superiorStar.z){
      superiorStar = s;
    }
    else{
      s.harvest();
    }
  });

  if(superiorStar instanceof Star){
    if(!superiorStar.harvested){
      Ship.update('fuel', Ship.fuel + superiorStar.harvest());
    }
  }

}
