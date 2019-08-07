var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var {mutant, stats} = require('./routes/mutant');

var app = express();
var router = express.Router();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/mutant', mutant );
app.get('/stats', stats);
app.get('/health', function(req, res) {
    res.send('Up and running.');
});

require('./model/dna.model');
require('./model/stats.model');

module.exports = app;
//