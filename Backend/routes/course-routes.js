'use strict'

var express = require('express');
var course_controller = require('../controllers/course-controller');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');


api.get('/getCourse/:code', course_controller.approved_courses);
api.post('/addCourse/:code', course_controller.add_courses);
api.delete('/deleteCourse/:id', mdAuth.ensureAuthAdmin, course_controller.delete_courses);

module.exports = api;