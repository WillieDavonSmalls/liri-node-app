require("dotenv").config();
var keys = require("./keys.js");

//movie_this command
var omdbApi = require('omdb-client');
var movie;
var song;

if (process.argv[3] !== undefined){ 
    movie = process.argv[3]; 
    song = process.argv[3];
}else{
    movie = "Mr. Nobody";
    song = "The Sign";
}

function movie_this(movie){
    var params = {
        apiKey: 'd1fb4eea',
        title: movie
    }
    omdbApi.get(params, function(error, omdbData) {
        console.log('Title: ' + omdbData.Title);
        console.log('Year: ' + omdbData.Year);
        console.log('IMDB Rating: ' + omdbData.imdbRating);
        console.log('Rotten Tomatoes Ratings: ' + omdbData.Ratings[0].Value);
        console.log('Country: ' + omdbData.Country);
        console.log('Language: ' + omdbData.Language);
        console.log('Plot: ' + omdbData.Plot);
        console.log('Actors: ' + omdbData.Actors);    
    });
}

if (process.argv[2] === "movie-this"){
    movie_this(movie);
}

//Twitter command
var Twitter = require('twitter');

var client = new Twitter(keys.twitter);
var params = {screen_name: 'nodejs'};

function my_tweets(){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        
        for (var i = 0; i < 20; i++){
        console.log('Date: ' + tweets[i].created_at + '\n' +' '+ tweets[i].text + '\n' + '\n');
        }
    }
    });
}

if (process.argv[2] === "my-tweets"){
    my_tweets();
}


//do what it says
var fs = require('fs')

if (process.argv[2] === "do-what-it-says"){
    var fileInfo = []
    fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) throw error;
    fileInfo = data.split(',');
    var userCommand = fileInfo[0];
    var userTask = fileInfo[1];
    console.log(userCommand, userTask);

    if (userCommand === "movie-this"){
        movie_this(userTask);
    }

    if (userCommand === "my-tweets"){
        my_tweets();
    }

    if (userCommand === "spotify-this-song"){
        spotify_this_song(userTask);
    }

    });
}



//Spotify
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

function spotify_this(song){
    spotify.search({ type: 'track', query: song, limit: 5  }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        for (var i = 0; i < 5; i++){
            //preview link 
            console.log('Preview Link: ' + data.tracks.items[i].href);
            //artist name
            console.log('Artist Name: ' + data.tracks.items[i].album.artists[0].name);
            //song name
            console.log('Song Name: ' + data.tracks.items[i].name);
            //album name 
            console.log('Album Name: ' + data.tracks.items[i].album.name);
        }
    });
}

if (process.argv[2] === "spotify-this-song"){
    spotify_this(song);
}