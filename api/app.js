const CONFIG = require('./config');

const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(CONFIG.uri.mongodb, { useNewUrlParser: true }, (err) => {
	if (err) console.error(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use('/', require('./app/routes'));

app.listen(CONFIG.server.port, () => {
	console.log('App is running on ' + CONFIG.server.port);
});