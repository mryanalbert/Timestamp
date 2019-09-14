// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// Timestamp Code
app.get('/api/timestamp/:date_string?', (req, res) => {
    const dateParam = req.params.date_string;
    let dateVal = new Date(dateParam);

    if (!dateParam) {
    // If the date string is empty it should be equivalent to trigger new Date()
        dateVal = new Date();
        res.json({ unix: dateVal.getTime(), utc: dateVal.toUTCString() });
    } else {
        if (isNaN(dateParam)) {
            if (dateVal == "Invalid Date") {
                // If the date string is invalid the api returns a JSON having the structure {"error" : "Invalid Date" }
                res.json({"error" : "Invalid Date" })
            } else {
                res.json({ unix: dateVal.getTime(), utc: dateVal.toUTCString() });
            }
        } else {
            dateVal = new Date(parseInt(dateParam));
            res.json({ unix: dateVal.getTime(), utc: dateVal.toUTCString() });
        }
    }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});