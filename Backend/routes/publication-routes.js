'use strict'

var express = require('express');
var publication_controller = require('../controllers/publication-controller');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

api.post('/addPublication', mdAuth.ensureAuthAdmin,publication_controller.add_publication); // crear una publicación
api.delete('/deletePublication/:id', mdAuth.ensureAuthAdmin ,publication_controller.delete_publication); // eliminar una publicación
api.put('/updatePublication/:id', mdAuth.ensureAuthAdmin,publication_controller.update_publication); // actualizar una publicación
api.get('/getPublications',mdAuth.ensureAuthAdmin, publication_controller.get_publications); // obtener todas las publicaciones

api.get('/getPublicationsFilterByCurso',mdAuth.ensureAuthAdmin, publication_controller.get_publications_filter_by_curso); // obtener todas las publicaciones que tengan un curso
api.get('/getPublicationsFilterByCatedratico',mdAuth.ensureAuthAdmin, publication_controller.get_publications_filter_by_catedratico); // obtener todas las publicaciones que tengan un profesor
api.get('/getPublicationsFilterByNameCurso',mdAuth.ensureAuthAdmin, publication_controller.get_publications_filter_by_name_curso); // obtener todas las publicaciones que tengan un nombre de curso
api.get('/getPublicationsFilterByNameCatedratico',mdAuth.ensureAuthAdmin, publication_controller.get_publications_filter_by_name_catedratico); // obtener todas las publicaciones que tengan un nombre de catedratico

module.exports = api;