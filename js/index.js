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
    if(keyboardInput.toggle){
      hub.toggle();
    }
    s.render();
  });
}

// counter for hub updating
// let hubUpdateInc = 0;

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
keyboardInput.toggleCallback = hub.toggle;

// start game loop
// updateCallback: update method defined above
// fpsCallback: arrow function that logs to fpsLog
// sets global variable Fps equal to the current fps rate
gameUpdate(update, (fps)=>{
  fpsLog.write("FPS:" + fps);
  Fps = fps;
});
