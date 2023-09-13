'use strict'

var express = require('express');
var comment_controller = require('../controllers/comment-controller');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

api.get('/getComments/:id', mdAuth.ensureAuthAdmin ,comment_controller.get_comments); // obtener todos los comentarios de una publicación
api.get('/get_Onecoment/:id', mdAuth.ensureAuthAdmin ,comment_controller.get_Onecoment); // obtener un comentario
api.post('/addComment/:id', mdAuth.ensureAuthAdmin ,comment_controller.add_comment); // añadir un comentario
api.delete('/deleteComment/:id', mdAuth.ensureAuthAdmin, comment_controller.delete_comment); // eliminar un comentario
api.put('/updateComment/:id', mdAuth.ensureAuthAdmin,comment_controller.update_comment); // actualizar un comentario

module.exports = api;