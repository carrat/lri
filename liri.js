
// load modules
var keys = require("./keys.js");
var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

var os = require("os");

var user = 'carrandrewt';


// command functions


// get tweets
function myTweets(user) {
//node liri.js my-tweets
//This will show your last 20 tweets and when they were created at in your terminal/bash window.

		var client = new twitter({
		  	consumer_key: keys.twitterKeys.consumer_key, 
			consumer_secret: keys.twitterKeys.consumer_secret, 
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret
		});

		var params = {screen_name: user, 
			
		};
		
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    for (i=0; i<tweets.length; i++) {
		    	console.log(i);
		    	console.log(tweets[i].text);
		    	console.log(tweets[i].created_at);
		    	console.log('-------------------');
		    	logText(tweets[i].text + os.EOL + tweets[i].created_at + os.EOL + '--------------------' + os.EOL)

		    }
		  }
		});

};

// get song information

function spotifyThisSong(song) {
//node liri.js spotify-this-song '<song name here>'

//This will show the following information about the song in your terminal/bash window

//Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from
//if no song is provided then your program will default to
//"The Sign" by Ace of Base

	if(song) {
	} else {
		song = 'The Sign';
	}

	var mySong = '';
	var mySongData = '';
	var myReturnData = '';
	

		spotify.search({ type: 'track', query: song }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }

		    for (i=0; i<data.tracks.items.length; i++) {
		    	myArtist = "Artist: " + data.tracks.items[i].artists[0].name;
		    	mySong = "Song: " + data.tracks.items[i].name;
		    	myAlbum = "Album: " + data.tracks.items[i].album.name;
		    	myPreview = "Preview: " + data.tracks.items[i].href;
		    	mySpace = '-----------------------------';
		    	console.log(myArtist);
		    	console.log(mySong);
		    	console.log(myAlbum);
		    	console.log(myPreview);
		    	console.log(mySpace);

		    	mySongData = myArtist + os.EOL + mySong  + os.EOL + myAlbum  + os.EOL +  myPreview + os.EOL + mySpace;
		    	myReturnData = mySongData;
		    	logText(myReturnData);

		    }
		    
		});


	logText(myReturnData);

};


// get movie information
function movieThis(movie) {

//node liri.js movie-this '<movie name here>'

//This will output the following information to your terminal/bash window:

//Title of the movie.
//Year the movie came out.
//IMDB Rating of the movie.
//Country where the movie was produced.
//Language of the movie.
//Plot of the movie.
//Actors in the movie.
//Rotten Tomatoes Rating.
//Rotten Tomatoes URL.
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

	if (movie) {

	} else {
		movie = 'Mr Nobody';
	}


	var requestURL = 'http://www.omdbapi.com/?t=' + movie;

	var myMovieData ='';

		request(requestURL, function (error, response, body) {
		  if (!error && response.statusCode == 200) {

		  	var body = JSON.parse(body);

		  	myTitle = "Title: " + body.Title;
			myYear = "Year: " + body.Year;
	    	myIMDB = "IMDB Rating: " + body.imdbRating;
	    	myCountry = "Country: " + body.Country;
	    	myLanguage = "Language: " + body.Language;
	    	myPlot = "Plot: " + body.Plot;
	    	myCast = "Cast: " + body.Actors;
	    	mySpace = '-----------------------------';
	    	console.log("Title: " + body.Title);
			console.log("Year: " + body.Year);
	    	console.log("IMDB Rating: " + body.imdbRating);
	    	console.log("Country: " + body.Country);
	    	console.log("Language: " + body.Language);
	    	console.log("Plot: " + body.Plot);
	    	console.log("Cast: " + body.Actors);
	    	console.log('-----------------------------');


		    myMovieData = myTitle + os.EOL + myYear  + os.EOL + myIMDB  + os.EOL +  myCountry + os.EOL + myLanguage + os.EOL + myPlot + os.EOL + myCast  + os.EOL + mySpace  + os.EOL;
			logText(myMovieData);

		  }
		})

	

};

// run random function from TXT file

function doWhatItSays() {

//node liri.js do-what-it-says

//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Feel free to change the text in that document to test out the feature for other commands.

// This block of code will create a file called "movies.txt".
// It will then print "Inception, Die Hard" in the file

	fs.readFile("random.txt", 'utf8', function(error, data) {
	    
	    var dataArr = data.split(',');
	    var command = dataArr[0];
	    var item = dataArr[1];

	    runProgram(command, item)

	}); 
};


// log the output to a TXT file
function logText(output) {
	fs.appendFile("log.txt", output  + os.EOL, function(err) { 
		// error check
	    if(err) {
	        return console.log(err);
	    }
	   
	}); 
};


// find the correct command to run
function runProgram(entry1, entry2) {

	var command = entry1;
	
	if (entry2) {
		var item = entry2;
	}
// evaluate arguments to grab command
	switch(command) {

		case 'my-tweets':
	        myTweets(user)
	        break;
	    case 'spotify-this-song':
	        spotifyThisSong(item);
	        break;
	    case 'movie-this':
		    movieThis(item);
		    break;
		case 'do-what-it-says':
		    doWhatItSays();
		    break;
	    default:
	        'No Function Defined'
	}
}

//run the program

var nodeArgs = process.argv;

// Create an empty string for holding the title
var title = "";

for (var i=3; i<nodeArgs.length; i++){

	// Build a string with the title.
	title = title + " " + nodeArgs[i];

}
runProgram(process.argv[2], title);



