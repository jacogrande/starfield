let hub = null;
const createHub = () => {
  hub = createLog("hub", `
    position:absolute;
    top:0% !important;
    left:0% !important;
    width:25%;
    height:96%;
    background:rgba(100,100,100,0.2);
    color:white;
    text-align:center;
  `);

  hub.append("<br>h &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; u &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b");

}

createHub();
