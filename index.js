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

app.get("https://3000-freecodecam-boilerplate-akk8mi0tzg8.ws-eu110.gitpod.io/api/:date",(req,res)=>{
  const pa=req.params;
  if (pa.date==""){
    const now = new Date();
    const unixTimestamp = Math.floor(now.getTime() / 1000); // Divide by 1000 to get seconds
    const utcDateTime = now.toUTCString()
    res.json({
      unix: unixTimestamp,
      utc:utcDateTime
    })
  }
  dtime=new Date(pa.date);
  if (isNaN(dtime)){
    res.json({error:"Invalid Date"});
  }
  var unixTimestamp = Math.floor(dtime.getTime()/1000);
  res.json({
    unix:unixTimestamp,
    utc:dtime.toUTCString()
  })


});
app.get("https://3000-freecodecam-boilerplate-akk8mi0tzg8.ws-eu110.gitpod.io/api/1451001600000",(req,res)=>{
  const urlParts=req.url.split('/')
  const lastPart = urlParts[urlParts.length - 1];
  const utime=parseInt(lastPart);
  const d = new Date(unixTime); 
  res.json({
    unix:utime,
    utc:d.toUTCString
  })

});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
