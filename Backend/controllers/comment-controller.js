'use strict'

const mysqlFunctions = require('../database/database');

// Crear un comentario
function add_comment(req, res) {
    const id = req.params.id; // id de la publicación
    const user = req.user.nameU
    const { message } = req.body;
    mysqlFunctions.query('insert into Comments (id_publication, user, message) values (?, ?, ?)', [id, user, message], (err, result) => {
        if (err) {
            res.status(500).json({error: 'Error al crear el comentario'});
        } else {
            res.status(200).json({message: 'Comentario creado con éxito'});
        }
    });
}

// Actualizar un comentario
function update_comment(req, res) {
    const id = req.params.id;
    const { message } = req.body;
    const user_token = req.user.nameU
    mysqlFunctions.query('select * from Comments where id = ?', [id], (err, result) => {
        if (err){
            res.status(500).json({error: 'Error al actualizar el comentario'});
        } else {
            if (result.length > 0) {
                if (result[0].user == user_token) {
                    mysqlFunctions.query('update Comments set message = ? where id = ?', [message, id], (err, result) => {
                        if (err) {
                            res.status(500).json({error: 'Error al actualizar el comentario'});
                        } else {
                            res.status(200).json({message: 'Comentario actualizado con éxito'});
                        }
                    });
                } else {
                    res.status(500).json({error: 'No tienes permisos para actualizar este comentario'});
                }
            } else {
                res.status(500).json({error: 'El comentario no existe'});
            }
        }
    })
}

// Eliminar un comentario
function delete_comment(req, res) {
    const id = req.params.id;
    const user_token = req.user.nameU 
    mysqlFunctions.query('select * from Comments where id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({error: 'Error al eliminar el comentario'});
        } else {
            if (result.length > 0) {
                if (result[0].user == user_token) {
                    mysqlFunctions.query('delete from Comments where id = ?', [id], (err, result) => {
                        if (err) {
                            res.status(500).json({error: 'Error al eliminar el comentario'});
                        } else {
                            res.status(200).json({message: 'Comentario eliminado con éxito'});
                        }
                    });
                } else {
                    res.status(500).json({error: 'No tienes permisos para eliminar este comentario'});
                }
            } else {
                res.status(500).json({error: 'El comentario no existe'});
            }
        }
    })
}

// Obtener todos los comentarios de una publicación
function get_comments(req, res){
    const id = req.params.id; // id de la PUBLICACIÓN   
    mysqlFunctions.query('select * from Comments where id_publication = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({error: 'Error al obtener los comentarios'});
        } else {
            res.status(200).json({comments: result})
        }
    });
}


// Obtner un comentario
function get_Onecoment(req, res){
    const id = req.params.id; // id deL COMENTARIO
    mysqlFunctions.query('select * from Comments where id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({error: 'Error al obtener los comentarios'});
        } else {
            res.status(200).json({comments: result})
        }
    });
}

module.exports = {
    add_comment,
    update_comment,
    delete_comment,
    get_comments,
    get_Onecoment
}

