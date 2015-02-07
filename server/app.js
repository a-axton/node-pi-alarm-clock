'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('./lib/socketio').listen(server);
var routes = require('./routes');
var alarm = require('./lib/alarm');


// configure express app
app.set('port', 9000);
app.use(bodyParser());

// mount static files for use on client side
app.use(express.static( path.join( __dirname, '../app') ));
app.use(express.static( path.join( __dirname, '../build') ));
app.use('/bower_components',  express.static( path.join( __dirname, '../bower_components' ) ));
app.use('/vendor',  express.static( path.join( __dirname, '../vendor' ) ));

app.get('/', routes.index );

server.listen(app.get('port'), function(){
    console.log('its go time');
});

module.exports = io;