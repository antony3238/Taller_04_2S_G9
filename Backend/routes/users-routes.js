'use strict'

// Import libraries and controller
var express = require('express');
const app = require('../app');
var userController = require('../controllers/user-controller');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

// Routes and function to use for queries
api.post('/registerUser', userController.registerUser); // Registrar un usuario
api.get('/findOneUser', userController.findOneUser); // Buscar un usuario
api.get('/findAllUsers', userController.findUsers); // Listar todos los usuarios
api.put('/updatePassword',userController.updatePasswordUser); // Modificar contraseña
api.post('/login', userController.login); // Login
api.get('/view_profile_users/:carnet', mdAuth.ensureAuthAdmin ,userController.view_profile_users); // Ver perfil de usuario si es usuario es el mismo entonces puede modificar sus datos
// Export variable
module.exports = api;

    