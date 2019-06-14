const Ship = {
  fuel:100,
  fuelConsumptionRate:1.5,
  fuelProcessingRate:0.5,
  tractorBeam:0,
  hullHP: 100,
  speed:5,
  update:(property, value)=>{
    Ship[property] = value;
    hub.updateData();
  }
}
