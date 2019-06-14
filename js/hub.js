const refreshHubData = () => {
  return `
    <br>
    <p>Fuel: ${Ship.fuel.toString().substring(0, 7)} </p>

  `;
}

const createHub = () => {
  let hub = createLog("hub", `
    position:absolute;
    top:0% !important;
    left:0% !important;
    width:25%;
    height:48%;
    background:rgba(100,100,100,0.2);
    color:rgba(255,255,255,0.8);
    text-align:center;
  `);

  const hubHeader = `
    <h2>h &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; u &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b</h2>
    <p style='color:rgba(255,255,255,0.5)'> Press <span style='color:rgba(116, 201, 255,0.5)'>'t'</span> to toggle </p>
  `;
  let hubData = refreshHubData();

  hub.append(hubHeader);
  hub.append(hubData);

  // setup hub toggling
  hub.isToggled = false;
  hub.toggle = () => {
    // toggle the hub
    hub.isToggled = !hub.isToggled;
    // if the hub is now toggled, make it invisible
    hub.isToggled ? hub.style.visibility = "hidden" : hub.style.visibility = "visible";
    hub.isToggled ? fpsLog.style.visibility = "hidden" : fpsLog.style.visibility = "visible";

  }

  hub.updateData = ()=>{
    hubData = refreshHubData()
    hub.write(hubHeader+hubData);
  }

  return hub;

}

const hub = createHub();
