// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var Twit = require('twit'),
config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */
    twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    }
},
T = new Twit(config.twitter);

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/likes/:user", (req, res) =>{
  T.get('favorites/list', { screen_name: req.params.user, count:200 },  function (err, data, response) {
    res.json({"id": data.randomElement().id_str})
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
