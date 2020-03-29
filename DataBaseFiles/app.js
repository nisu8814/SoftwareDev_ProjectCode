var pg = require('pg');
var apiKey = "6adef049dd8abe2d9aac6577b7a20f93";
var conStr = "postgres://postgres:Krl3&3R@localhost:5432/weatherdb";

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

		console.log(buffer);
		console.log("\n");
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
		console.log(data);
		
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

