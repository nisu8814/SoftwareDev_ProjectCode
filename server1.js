/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'postgres',
	user: 'postgres',
	password: 'help' //modidfy this line  to the password you set on the database.
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


var pg = require('pg');
var apiKey = "6adef049dd8abe2d9aac6577b7a20f93";
var conStr = "postgres://postgres:help@localhost:5432/postgres";//modify this line to the password you set in the database

var client = new pg.Client(conStr);
client.connect();

var ret = client.query("select * from daily_weather");

var http = require("http");
url = "http://api.openweathermap.org/data/2.5/weather?q=boulder,colorado&units=imperial&appid=" + apiKey;

var request = http.get(url, function (response) {
	
	var buffer = "",
		data;
	response.on("data", function (chunk) {
		buffer += chunk;
	});

	response.on("end", function (err) {

		//console.log(buffer);
		//console.log("\n");
		data = JSON.parse(buffer);

		var date = new Date();
		var temp_f_high = data.main.temp_max;
		var temp_c_high = (temp_f_high - 32) * (9/5);
		var temp_f_low = data.main.temp_min;
		var temp_c_low = (temp_c_low - 32) *(9/5);

		var humidity = data.main.humidity;
		var precipitation = data.weather[0]["main"];
		var wind = data.wind["speed"];
		var feels_like = data.main.feels_like;
		var pressure = data.main.pressure;
		var description = data.weather["description"];
debugger
		//console.log(data);
		
		client.query("INSERT INTO daily_weather(day, temp_f_high, temp_f_low, temp_c_high, temp_c_low, humidity, precipitation, coverage, alerts, feels_like, pressure, wind, description, precip_chance) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
			[
				date
				,temp_f_high
				,temp_c_high
				,temp_f_low
				,temp_c_low
				,humidity
				,precipitation
				,null
				,null
				,feels_like
				,pressure
				,wind
				,description
				,null
			]);
	});
});


app.get('/frontpage', function(req, res) {
	res.render('pages/frontpage',{
		local_css:"frontpage.css", 
		my_title:"Front Page"
	});
});

app.get('/futurepage', function(req, res) {
	res.render('pages/futurepage',{
		local_css:"futurepage.css",
		my_title:"Future weather"
	});
});
app.get('/previouspage', function(req, res) {
	res.render('pages/previouspage',{
		local_css:"previouspage.css",
		my_title:"Previous weather"
	});
});
app.get('/aboutus', function(req, res) {
	res.render('pages/aboutus',{
		local_css:"aboutus.css",
		my_title:"About Us"
	});
});
app.get('/statistics', function(req, res) {
	res.render('pages/statistics',{
		local_css:"statistics.css",
		my_title:"Statistics"
	});
});

///<<<<<<< HEAD
///=======
app.get('/', function(req, res) {
	res.render('pages/frontpage', {
		local_css:"frontpage.css",
		my_title:"Front Page"
	});
})
// app.get('/home', function(req, res) {
// 	var query = 'select * from favorite_colors;';
// 	db.any(query)
//         .then(function (rows) {
//             res.render('pages/home',{
// 				my_title: "Home Page",
// 				data: rows,
// 				color: '',
// 				color_msg: ''
// 			})

//         })
//         .catch(function (err) {
//             // display error message in case an error
//             console.log('error', err);
//             response.render('pages/home', {
//                 title: 'Home Page',
//                 data: '',
//                 color: '',
//                 color_msg: ''
//             })
//         })
// });
// app.get('/home/pick_color', function(req, res) {
// 	var color_choice = req.query.color_selection;
// 	var color_options =  'select * from favorite_colors;';
// 	var color_message = "select color_msg from favorite_colors where hex_value = '" + color_choice + "';";
// 	db.task('get-everything', task => {
//         return task.batch([
//             task.any(color_options),
//             task.any(color_message)
//         ]);
//     })
//     .then(info => {
//     	res.render('pages/home',{
// 				my_title: "Home Page",
// 				data: info[0],
// 				color: color_choice,
// 				color_msg: info[1][0].color_msg
// 			})
//     })
//     .catch(err => {
//         // display error message in case an error
//             console.log('error', err);
//             response.render('pages/home', {
//                 title: 'Home Page',
//                 data: '',
//                 color: '',
//                 color_msg: ''
//             })
//     });

// });
// app.get('/team_stats', function(req,res) {

// 	var query1 = 'select * from football_games;';
// 	var query2 = 'select count(*) as win from football_games where home_score>visitor_score ;';
// 	var query3 = 'select count(*) as loss from football_games where visitor_score>home_score;';
// 	db.task('get-everything', task => {
// 		return task.batch([
// 			task.any(query1),
// 			task.any(query2),
// 			task.any(query3)
// 		]);
// 	})
// 	.then(data => {
// 		res.render('pages/team_stats',{
// 				my_title: "Team Stats",
// 				result1: data[0],
// 				result2: data[1],
// 				result3: data[2]
// 			})
// 	})
// 	.catch(err => {
// 		// display error message in case an error
// 			console.log('error', err);
// 			res.render('pages/team_stats',{
// 				my_title: "Team Stats",
// 				result_1: 'task 1 failed',
// 				result_2: 'task 2 failed',
// 				result_3: 'task 3 failed'
// 			})
// 	});





// });
// app.post('/home/pick_color', function(req, res) {
// 	var color_hex = req.body.color_hex;
// 	var color_name = req.body.color_name;
// 	var color_message = req.body.color_message;
// 	var insert_statement = "INSERT INTO favorite_colors(hex_value, name, color_msg) VALUES('" + color_hex + "','" +
// 							color_name + "','" + color_message +"') ON CONFLICT DO NOTHING;";

// 	var color_select = 'select * from favorite_colors;';
// 	db.task('get-everything', task => {
//         return task.batch([
//             task.any(insert_statement),
//             task.any(color_select)
//         ]);
//     })
//     .then(info => {
//     	res.render('pages/home',{
// 				my_title: "Home Page",
// 				data: info[1],
// 				color: color_hex,
// 				color_msg: color_message
// 			})
//     })
//     .catch(err => {
//         // display error message in case an error
//             console.log('error', err);
//             response.render('pages/home', {
//                 title: 'Home Page',
//                 data: '',
//                 color: '',
//                 color_msg: ''
//             })
//     });
// });


/*Add your other get/post request handlers below here: */
///>>>>>>> a4d93ed00d156f3d3cac21974ab68aca93900809


app.listen(3000);
console.log('3000 is the magic port');
