
let sentimentService = require('./sentimentService');
let util = require('./util/webUtil');
let https = require('https');
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');

// --------------------------------------------------
// Seed the database. 
// --------------------------------------------------
// To see how the site would work with real data, 
// uncomment the next line and run the web app. 
// let dbutil = require('./util/dbUtil');
// --------------------------------------------------
// Don't forget to uncomment it!
// --------------------------------------------------

// run the web app
const app = express();
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client'), { maxAge: 31557600000 }));

app.get('/', async function (req, res) {
  const data = await sentimentService();
  let sentimentWithLevel = [];

  // let s of data.tweets
  for (let s in data.tweets) {
    let newTweet = {
      sentiment: s.sentiment,
      level: util.getHappinessLevel(s.sentiment)
    };
    sentimentWithLevel.push(newTweet);
  }

  res.render('index', {
    tweets: sentimentWithLevel,
    counts: data.counts
  });
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log("app listening on port: " + port);

module.exports = app;
