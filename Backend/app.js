'use strict'

// Import Libraries and routes
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userRoutes = require('./routes/users-routes');
var publicationRoutes = require('./routes/publication-routes');
var commentRoutes = require('./routes/comment-routes');
var courseRoutes = require('./routes/course-routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Declaration of CORS and Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/publication', publicationRoutes);
app.use('/comment', commentRoutes)
app.use('/course', courseRoutes);
module.exports = app;

