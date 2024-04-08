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

  if (pa.date.includes("-",4)){
      dtime=new Date(pa.date);
      if (isNaN(dtime)){
        res.json({
          error:"Invalid Date"
        })
      }
    var unixTimestamp = dtime.getTime();
    res.json({
      unix:unixTimestamp,
      utc:dtime.toUTCString()
      })
  }
  if (!pa.date.includes("-",0)){
    const utime=parseInt(pa.date);
    const d = new Date(utime); 
    if (isNaN(d)){
      res.json({
        error:"Invalid Date"
      })
    }
    res.json({
      unix:utime,
      utc: d.toUTCString()
    })
  }


});
app.get("/api/", function(req, res) {
  var resDate = new Date();
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
