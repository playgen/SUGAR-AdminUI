var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();
var app = express();
var mockPath = __dirname + '/mock-data/';

var design = {
	'GET /users': 'listUsers',
	'GET /users/:id': 'getUser',
	'PUT /users/:id': 'getUser',
	'POST /users/:id': 'getUser',
	'DELETE /users/:id': 'getUser',

	'GET /groups': 'listGroups',
	'GET /groups/:id': 'getGroup',
	'PUT /groups/:id': 'getGroup',
	'POST /groups/:id': 'getGroup',
	'DELETE /groups/:id': 'getGroup'
}

var logins = {
	'jack': '123456',
	'matt': '123456',
	'mayur': '123456',
	'wilson': 'will'
};

var tokens = [ 'jacktest' ];

app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

Object.keys(design).forEach(function (req) {
	var method = req.split(' ').shift();
	var path = req.split(' ').pop();
	var mock = '{}';
	try {
		mock = require(mockPath + design[req]);
	} catch (e) {}

	router.route(path)[method.toLowerCase()](function (req, res) {
		if (tokens.indexOf(req.headers['x-http-session']) !== -1) {
			res.status(200).send(mock);
		} else {
			res.status(401).send({ message: 'not auth' });
		}
	});
});

app.post('/loginplatform', function (req, res) {
	console.log(req.body);
	if (req.body && req.body.username && logins[req.body.username] === req.body.password) {
		res.status(200).send({ token: tokens[0] });
	} else {
		res.status(401).send({ message: 'login failed' });
	}
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log('Server is running on port \"' + port + '\"');
});
