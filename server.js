'use strict';
let express = require("express");
let bodyParser = require("body-parser")
let app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.get("/", function (req, res) {
		console.log("routing "+req.url);
    res.sendFile(__dirname + "/save_money.html")
});
app.post("/", function(req, res){
	console.log(req.body);
	res.sendStatus(200);
});
console.log("Listening");
app.listen(8080);
