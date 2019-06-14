// autopilot feature
// finds the nearest star and goes to it
function Autopilot(){

  // enabling controls
  let enabled = false;
  this.toggleEnabled = ()=>{
    enabled = !enabled;
    if(enabled){
      disableMovement();
    }
  }
  this.isEnabled = () => {
    return enabled;
  }

  // pathfinding
  let nearestStar = null;
  let starFound = false;
  let currentNearest = null;
  let paused = false;
  // called once per update
  this.click = () => {
    if(enabled){
      if(!starFound){
        // loops through stars to find the closest
        currentNearest = stars[0];
        stars.forEach((s)=>{
          if(s.getSize() < 5 && s.getSize() > currentNearest.getSize() && s.x > canvas.getWidth()/3 && s.x < canvas.getWidth()*2/3){
            currentNearest = s;
          }
        });
        starFound = true;
      }
      // sets aim to nearest
      if(!paused){
        nearestStar = currentNearest;
        verticalScroll=Math.sin((canvas.getHeight()/2 - nearestStar.y)/1000);
        horizontalScroll=Math.sin((canvas.getWidth()/2 - nearestStar.x)/1000);
        stars.forEach((s)=>{
          s.movementHandler("up");
        });
      }

      if(nearestStar.getSize() > 100){
        console.log("goteem");
        paused = true;
        starFound = false;
        setTimeout(()=>{
          paused = false;
        },500);
      }

    }
  }

}
