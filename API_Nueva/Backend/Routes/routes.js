const express = require("express");
const router = express.Router();
const {addUser,Login,updateUser,ListUser,MydataUser,ForgotPassword,TotalCreditos} = require("../Controllers/userscontrollers")
const {Listcourses,Listcate,addCurso,MyCourses} = require("../Controllers/coursecontrollers")
const {addpublication,listpublications,mylistpublications} = require("../Controllers/publicationcontrollers")
const {addcomment,listcomment} = require("../Controllers/commentscontrollers")

/* Usuarios */
router.post('/addUser', addUser);
router.post('/Login', Login);
router.post('/updateUser', updateUser);
router.post('/ListUser', ListUser);
router.post('/MydataUser', MydataUser);
router.post('/ForgotPassword', ForgotPassword);
router.post('/TotalCreditos', TotalCreditos);

/* Comentarios */
router.post('/addcomment', addcomment);
router.post('/listcomment', listcomment);

/* Publicaciones */
router.post('/addpublication', addpublication);
router.get('/listpublications', listpublications);
router.post('/mylistpublications', mylistpublications);

/* Cursos */
router.get('/Listcourses', Listcourses);
router.get('/Listcate', Listcate);
router.post('/addCurso', addCurso);
router.post('/MyCourses', MyCourses);

module.exports = router;