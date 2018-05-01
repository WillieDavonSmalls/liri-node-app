require("dotenv").config();

//movie_this command
var omdbApi = require('omdb-client');
var movie;

if (process.argv[3] !== undefined){ 
    movie = process.argv[3]; 
}else{
    movie = "Mr. Nobody"
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

if (process.argv[2] === "movie_this"){
    movie_this(movie);
}

//Twitter command
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'l9utAFFpx93fn9QTSSShxykix',
  consumer_secret: 'xoEnolNuHEZ5qZ5h9vp8UvL6tW8TL3M3fyEjYxGzcZd8eOoExl',
  access_token_key: '833877825476296704-c6t0urYGgeBKMwyWLXSANXKsapfXVor',
  access_token_secret: 'ucCuM4pLriA1up5OjBqTcxFFLC1vjhCUvnjNWW5ltIAZC'
});
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

if (process.argv[2] === "my_tweets"){
    my_tweets();
}


//do what it says
var fs = require('fs')

if (process.argv[2] === "do_what_it_says"){
    var fileInfo = []
    fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) throw error;
    fileInfo = data.split(',');
    var userCommand = fileInfo[0];
    var userTask = fileInfo[1];
    console.log(userCommand, userTask);

    if (userCommand === "movie_this"){
        movie_this(userTask);
    }

    if (userCommand === "my_tweets"){
        my_tweets();
    }

    if (userCommand === "spotify_this_song"){
        spotify_this_song(userTask);
    }

    });
}



//Spotify
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify({
//     id: "cd75cbbd0ec641c9961f1be9b118598f",
//     secret: "45972209e2294c7eb3a6375be90eb520"
//   });

       
//     spotify.search({ type: "track", query: "Work" }, function(err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         }
        
//         console.log(data); 
//     });
