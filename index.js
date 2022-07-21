
var express = require('express');
var app = express();

var cors = require('cors');
const { Router } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
function handler (req, res) {
  const current_date = req.params.date;
  let new_date,unix, utc;
  if (!current_date){
    new_date = new Date()
    unix = new_date.getTime()
    utc = new_date.toUTCString();
  }
  else{
    new_date = !isNaN(current_date)
          ? new Date(parseInt(current_date))
          : new Date(current_date);
    unix = new_date.getTime()
    utc = new_date.toUTCString();
    if (utc == "Invalid Date"){
      return res.json({error: utc})
    }
  }
  return res.json({"unix": Number(unix), "utc": utc})
  

}

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.route('/api/:date?').get(handler)
var listener = app.listen(8888, function () {
  console.log('Your app is listening on port ' +8888);
});
