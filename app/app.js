var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var {mutant} = require('./routes/mutant');

var app = express();
var router = express.Router();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/mutant', mutant );
app.get('/health', function(req, res) {
    res.send('Up and running.');
});

module.exports = app;
