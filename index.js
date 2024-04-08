// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date",(req,res)=>{
  const pa=req.params;
  if (pa.date===""){
    const now = new Date();
    const unixTimestamp = Math.floor(now.getTime() / 1000); // Divide by 1000 to get seconds
    res.json({
      unix: unixTimestamp,
      utc: now.toUTCString()
    })
  }

  if (pa.date.includes("-",4)){
      dtime=new Date(pa.date);
      console.log(dtime);
    var unixTimestamp = Math.floor(dtime.getTime()/1000);
    res.json({
      unix:unixTimestamp,
      utc:dtime.toUTCString()
      })
  }
  if (!pa.date.includes("-",0)){
    console.log(pa.date);
    const utime=parseInt(pa.date);
    const d = new Date(utime); 
    console.log(d);
    res.json({
      unix:utime/1000,
      utc: d.toUTCString()
    })
  }else{
    res.json({
      "error":"Invalid Date"
    })
  }


});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
