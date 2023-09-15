const express = require("express");
const router = express.Router();
const {addUser} = require("../Controllers/userscontrollers")

/* Usuarios */
router.post('/addUser', addUser);

/* Comentarios */


/* Publicaciones */


/* Cursos */


module.exports = router;