var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(express.json());


var fs = require('fs');
const { data } = require('jquery');
const exp = require('constants');
const { text } = require('body-parser');


//global variable for tweet data
var tweetinfo = []
var searchedTweets = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    tweetinfo = JSON.parse(data); //array of json values
    //TODO: store loaded data into a global variable for tweet data
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  res.send(tweetinfo)
  res.end()
  //TODO: send all users' IDs
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  res.send(tweetinfo);
  res.end()
  //TODO: send tweet info
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  res.send(searchedTweets);
  res.end()
  //TODO: send searched tweets

});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {

  tweetID = req.body.id;
  tweetText = req.body.text;

  //add created tweet to array
  tweetinfo.push({
    created_at: Date(),
    id: parseInt(tweetID),
    id_str: tweetID,
    text: tweetText
  })
  //console.log(JSON.stringify(tweetinfo));
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  var sterm = req.body.userID;

  //look for search term then add tweet to list
  tweetinfo.forEach(function(tweet, index) {
    if (tweet.id == sterm) {
      searchedTweets.push(tweetinfo[index]);
    }
  });

  res.send(searchedTweets);
});

//Update
app.put('/tweets/:nm', function(req, res) {
  var toReplace = req.params.nm;
  var nn = req.body.newName;

  var found = false;

  //search for useres name then replace their screenname with newName
  tweetinfo.forEach(function(tweet, index) {
      if (!found && (tweet.user.name === toReplace)) {
        tweet.user.screen_name = nn;
      }
});
});

//Delete 
app.delete('/tweetinfo/:id', function(req, res) {
  var id = req.params.id;
  
  var found = false;
  
  //splice out the tweet that matches the id
  tweetinfo.forEach(function(tweet, index) {
      if (!found && (tweet.id === Number(id))) {
          tweetinfo.splice(index, 1);
      }
  });

  res.send('Successfully deleted product!');
  res.end()
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});
