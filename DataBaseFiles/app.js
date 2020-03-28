var pg = require('pg');
var apiKey = "6adef049dd8abe2d9aac6577b7a20f93";
var conStr = "postgres://postgres:Krl3&3R@localhost:5432/weatherdb";

var client = new pg.Client(conStr);
client.connect();

var ret = client.query("select * from daily_weather");

var http = require("http");
url = "http://api.openweathermap.org/data/2.5/weather?q=boulder,colorado&appid=" + apiKey;

var request = http.get(url, function (response) {
	
	var buffer = "";

	response.on("data", function (chunk) {
		buffer += chunk;
	});

	response.on("end", function (err) {

		console.log(buffer);
		console.log("\n");
	});

});
