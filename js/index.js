// draw method
// caleld by update
// renders all stars to the DOM
const draw = () => {
  canvas.clear();
  Object.keys(keyboardInput).forEach((k)=>{
    if(keyboardInput[k] == true){
      Ship.update('fuel',Ship.fuel - Ship.fuelConsumptionRate / Fps);
    }
  });
  stars.forEach((s)=>{
    if(keyboardInput.up){
      s.movementHandler("up");
    }
    if(keyboardInput.down){
      s.movementHandler("down");
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
  Object.keys(Ship.tools).forEach((t)=>{
    Ship.tools[t].click();
  });

  if(Ship.fuel <= 0){
    Ship.update('fuel',0);
    endGame('game over');
  }
}

const handleMouseMovement = (mousePositionsAltered, originalMousePositions) => {
  verticalScroll = mousePositionsAltered[1];
  horizontalScroll = mousePositionsAltered[0];
  mouseX = originalMousePositions[0];
  mouseY = originalMousePositions[1];
}

setupMouseTracking(handleMouseMovement, canvas.getWidth()/2, canvas.getHeight()/2);
keyboardInput.toggleCallback = hub.toggle;

// start game loop
// updateCallback: update method defined above
// fpsCallback: arrow function that logs to fpsLog
// sets global variable Fps equal to the current fps rate
let gameFunct = gameUpdate(update, (fps)=>{
  fpsLog.write("FPS:" + fps);
  Fps = fps;
});
//
// Ship.tools.autopilot.toggleEnabled();
// hub.updateData();
