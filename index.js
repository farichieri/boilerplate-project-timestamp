// index.js
// where your node app starts
require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// result endpoint...
app.get('/api/:date?', function (req, res) {
  let { date } = req.params;

  if (!date) {
    date = String(Date.now());
  }

  if (!date.includes('-')) {
    date =
      new Date(String(date)).getTime() ||
      new Date(Number(String(date))).getTime();
  } else {
    date = new Date(date).getTime();
  }

  const utcDate = new Date(date).toUTCString();

  if (!isNaN(new Date(date).getTime())) {
    res.json({ unix: date, utc: utcDate });
  } else {
    res.send({ error: 'Invalid Date' });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
