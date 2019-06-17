// method that creates a canvas on the DOM and returns its context
// it takes the canvas element's desired id and the size of the element in array form –– [width, height]
// size defaults at full screen (force default by submitting 'default')
// style takes a style string and appends it to the canvas
const createCanvas = (id, size, style)=>{
  // bind element to DOM
  let canvas = document.createElement("canvas");
  canvas.id = id;
  document.body.appendChild(canvas);

  // modify styles and sizes
  if(size && size != 'default'){
    canvas.setAttribute("width",size[0]);
    canvas.setAttribute("height", size[1]);
  }
  else {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
  }
  if(style){
    canvas.style = style + "; position:absolute; top:0;left:0;";
  }
  else canvas.style = 'position:absolute; top:0; left:0;';

    /* –––––––––––––––––––––––––––––––––– */
   /*            Prototyping             */
  /* –––––––––––––––––––––––––––––––––– */
  let context = canvas.getContext("2d");

  // clears canvas
  context.clear = ()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  context.getWidth = () => canvas.getAttribute("width");
  context.getHeight = () => canvas.getAttribute("height");


  return context;
}

// method that creates a logging element
const createLog = (id, style) => {

  // bind element to DOM
  let log = document.createElement("p");
  log.id = id;
  document.body.appendChild(log);

  // style
  if(style){
    log.style = style + "position:absolute; top:0%; left:0%";
  }
  else log.style = "position:relative; top:0%; left: 95%;color:white";

    /* –––––––––––––––––––––––––––––––––– */
   /*            Prototyping             */
  /* –––––––––––––––––––––––––––––––––– */

  // replaces logs text
  log.write = (message) => {
    log.innerHTML = message;
  }

  // adds text to log
  log.append = (message) => {
    log.innerHTML += message;
  }

  return log;

}


// main update method
// this method takes two callbacks
// {param} updateCallback : method to be called on every update (main game method)
// {param} logCallback : method to be called for logging FPS

let ss_fps = 0;
let ss_inc = 0;
let ss_lastCalledTime = performance.now();
let gameRunning = true;

const gameUpdate = (updateCallback, fpsCallback) => {
  // calls fpsCallback function every second, passing it the current fps
  if(fpsCallback){
    let delta = (performance.now() - ss_lastCalledTime)/1000;
    ss_lastCalledTime = performance.now();
    ss_fps = Math.floor(1/delta);
    ss_inc++;
    if(ss_inc > ss_fps){
      fpsCallback(ss_inc);
      ss_inc = 0;
    }
  }
  // calls the update callback function
  if(gameRunning){
    updateCallback();
  }

  window.requestAnimationFrame(()=>gameUpdate(updateCallback, fpsCallback));
}

const endGame = (message) => {
  gameRunning = false;
  console.log(message);
}
