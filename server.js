'use strict';
let express = require("express");
let bodyParser = require("body-parser")
let app = express();
let userid;

function database(req){
	console.log(req.connection.remoteAddress);
	if (userid == req.connection.remoteAddress){
		return true;
	}
	userid = req.connection.remoteAddress;
	return false;
}
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.get("/", function (req, res) {
		console.log("routing "+req.url);
    res.sendFile(__dirname + "/save_money.html")
});
app.post("/", function(req, res){
	if(database(req)){
		console.log("Sending code");
		res.send({code: "Jordan is a big NOOB"});
		return;
	}
	console.log(req.body);
	res.sendStatus(200);
});
app.post("/map", function(req, res){
	if(database(req)){
		console.log("Sending bus locations");
		res.send({bus: [{lat: 50, lng: 50},{lat: -50, lng: -50}]});
		return;
	}
	console.log(req.body);
	res.sendStatus(200);
});
console.log("Listening");
app.listen(8080);
