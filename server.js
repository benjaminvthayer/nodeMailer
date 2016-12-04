var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://@smtp.gmail.com');//Insert email address and password here  


app.set('view engine','ejs');
app.set('views', __dirname +'/views');
app.use(express.static(__dirname+'/public'));
app.get('/', function (req, res) {
  res.render('index' ,{title: 'MyTitle'})
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/test',function (req, res) {
	var fromString = req.query.name + '<benjaminvthayer@gmail.com>'
	var mailoptions = {
		from: fromString, // sender address
		to: req.query.email, // list of receivers
		subject: req.query.subject, // subject line
		text: req.query.message, // plaintext body
	};
	transporter.sendMail(mailoptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('message sent: ' + info.response);
	});
});

app.listen(8081);
console.log('Server running at http://127.0.0.1:8081/');

