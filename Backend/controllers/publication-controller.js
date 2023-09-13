'use strict'

const mysqlFunctions = require('../database/database');

// Crear una publicación
function add_publication(req, res) {
    const user = req.user.nameU;
    const { course , professor, message } = req.body;
    mysqlFunctions.query('insert into Publications (user, course, professor, message) values(?, ?, ?, ?)', [user, course , professor, message], (err, result) => {
        if (err) {
            res.status(500).json({error: 'Error al crear la publicación'});
        } else {
            res.status(200).json({message: 'Publicación creada con éxito'});
        }
    });
}

// Actualizar una publicación
function update_publication(req, res) {
    const id = req.params.id;
    const user_token = req.user.nameU;
    mysqlFunctions.query('select * from Publications where id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({error: 'Error al actualizar la publicación'});
        } else {
            if (result.length > 0) {
                if (result[0].user == user_token) {
                    const { message } = req.body;
                    mysqlFunctions.query('update Publications set message = ? where id = ?', [message, id], (err, result) => {
                        if (err) {
                            res.status(500).json({error: 'Error al actualizar la publicación'});
                        } else {
                            res.status(200).json({message: 'Publicación actualizada con éxito'});
                        }
                    });
                } else {
                    res.status(500).json({error: 'No tienes permisos para actualizar esta publicación'});
                }
            } else {
                res.status(500).json({error: 'La publicación no existe'});
            }
        }
    });
}

// Eliminar una publicación
function delete_publication(req, res) {
    const id = req.params.id;
    const user_token = req.user.nameU;
    mysqlFunctions.query('select * from Publications where id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({error: 'Error al eliminar la publicación'});
        }else{
            if (result.length > 0) {
                if (result[0].user == user_token) {
                    mysqlFunctions.query('delete from Publications where id = ?', [id], (err, result) => {
                        if (err) {
                            res.status(500).json({error: 'Error al eliminar la publicación'});
                        } else {
                            res.status(200).json({message: 'Publicación eliminada con éxito'});
                        }
                    });
                } else {
                    res.status(500).json({error: 'No tienes permisos para eliminar esta publicación'});
                }
            } else {
                res.status(500).json({error: 'La publicación no existe'});
            }
        }
    });
}

// Obtener todas las publicaciones
function get_publications(req, res){
    mysqlFunctions.query('select * from Publications', (err, result) => {
        if (err) {
            res.status(500).json({error: 'Error al obtener las publicaciones'});
        } else {
            res.status(200).json({publications: result})
        }
    });
}


/* Busquedas aplicando filtros */

// Filtrar por cursos -> obtener todas las publicaciones que tengan un curso y que me lo muestre por fecha de creacion mas reciente a lo mas antiguo
function get_publications_filter_by_curso(req, res) {
    mysqlFunctions.query('select * from Publications where course IS NOT NULL ORDER BY creation_date DESC', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las publicaciones' });
        } else {
            res.status(200).json({ publications: result });
        }
    });
} 

// Filtrar por catedratico -> obtener todas las publicaciones que tengan un curso
function get_publications_filter_by_catedratico(req, res) {
    mysqlFunctions.query('select * from Publications where professor IS NOT NULL ORDER BY creation_date DESC', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las publicaciones' });
        } else {
            res.status(200).json({ publications: result });
        }
    });
} 

// Filtrar por nombre del curso -> obtener todas las publicaciones que tengan el nombre de un curso
function get_publications_filter_by_name_curso(req, res) {
    const { nameCurso } = req.body;
    mysqlFunctions.query('select * from Publications where course = ? ORDER BY creation_date DESC', [nameCurso], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las publicaciones' });
        } else {
            res.status(200).json({ publications: result });
        }
    });
}

// Filtrar por nombre del catedratico -> obtener todas las publicaciones que tengan el nombre de un catedratico
function get_publications_filter_by_name_catedratico(req, res) {
    const { nameCatedratico } = req.body;
    mysqlFunctions.query('select * from Publications where professor = ? ORDER BY creation_date DESC', [nameCatedratico], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las publicaciones' });
        } else {
            res.status(200).json({ publications: result });
        }
    });
}


module.exports = {
    add_publication,
    update_publication,
    delete_publication,
    get_publications,
    get_publications_filter_by_curso,
    get_publications_filter_by_catedratico,
    get_publications_filter_by_name_curso,
    get_publications_filter_by_name_catedratico
}

