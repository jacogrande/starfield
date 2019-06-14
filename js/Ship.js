const Ship = {
  fuel:100,
  fuelConsumptionRate:10,
  fuelProcessingRate:0.5,
  tractorBeam:0,
  hullHP: 100,
  speed:5,
  update:(property, value)=>{
    Ship[property] = value;
    hub.updateData();
  },
  tools:{
    autopilot: new Autopilot()
  }
}
