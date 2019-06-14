const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const random = (min, max) => {
  return Math.random() * (max - min) + min;
}

let keyboardInput = {
  up: false,
  right: false,
  down: false,
  left: false,
  space: false,
  toggle: false,
  toggleCallback:()=>{}
};

// sets up mouse tracking with possible axis
// {param} movementCallback - callback method that will be passed an array containing the x and y positions –– callback([x,y])
const setupMouseTracking = (movementCallback, xAxis, yAxis) => {
  // assigns an event listener to the document body
  document.body.onmousemove = (event) => {
    let x = event.clientX;
    let y = event.clientY;
    // modify mouse position based on axis
    if(yAxis){
      y = Math.sin((yAxis - y)/1000);
    }
    if(xAxis){
      x = Math.sin((xAxis - x)/1000);
    }

    movementCallback([x,y]);

  }
}

let toggleLock = false;

document.addEventListener("keydown",function(event){
  if(event.keyCode == 87){ // up (W)
    keyboardInput.up = true;
  }
  if(event.keyCode == 68){ // right (D)
    keyboardInput.right = true;
  }
  if(event.keyCode == 83){ // down (S)
    keyboardInput.down = true;
  }
  if(event.keyCode == 65){ // up (A)
    keyboardInput.left = true;
  }
  if(event.keyCode == 32){ // space
    keyboardInput.space = true;
  }
  if(event.keyCode == 84){ // t
    if(!toggleLock){
      // console.log(keyboardInput.toggleCallback);
      keyboardInput.toggleCallback();
      toggleLock = true;
    }
  }
});

document.addEventListener("keyup",function(event){
  if(event.keyCode == 87){ // up (W)
    keyboardInput.up = false;
  }
  if(event.keyCode == 68){ // right (D)
    keyboardInput.right = false;
  }
  if(event.keyCode == 83){ // down (S)
    keyboardInput.down = false;
  }
  if(event.keyCode == 65){ // up (A)
    keyboardInput.left = false;
  }
  if(event.keyCode == 32){
    keyboardInput.space = false;
  }
  if(event.keyCode == 84){
    toggleLock = false;
  }
});
