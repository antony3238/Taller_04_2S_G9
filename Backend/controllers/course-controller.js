'use strict'

const mysqlFunctions = require('../database/database');

function approved_courses(req, res) {
    const code = req.params.code; // codigo del usuario REGISTRO ACADEMICO
    mysqlFunctions.query('select * from Courses where user_code = ?', [code], (err, result) => {
        if (err) {
            res.status(500).send({error: 'Error al obtener los cursos aprobados'});
        } else {
            const total_credits = result.reduce((total, course) => total + course.credits, 0);
            res.status(200).send({approved_courses: result, total_credits});
        }
    });
}

function add_courses(req, res) {
    const code = req.params.code; // codigo del usuario REGISTRO ACADEMICO  
    const { course_name, credits } = req.body;
    if (course_name && credits) {
        mysqlFunctions.query('insert into Courses (user_code, course_name, credits) values (?, ?, ?)', [code, course_name, credits], (err, result) => {
            if (err) {
                res.status(500).send({error: 'Error al agregar el curso'});
            } else {
                res.status(200).send({message: 'Curso agregado con éxito'})
            }
        });
    } else {
        res.status(400).send({erro: 'Falta información requerida'});    
    }
}

function delete_courses(req, res) {
    const id_course = req.params.id;
    const code_user = req.user.sub;
    
    mysqlFunctions.query('delete from Courses where id = ? and user_code = ?', [id_course, code_user], (err, result) => {
        if (err) {
            res.status(500).send({error: 'Error al eliminar el curso'});
        } else {
            res.status(200).send({message: 'Curso eliminado con éxito'});
        }
    });
}

module.exports = {
    approved_courses,
    add_courses,
    delete_courses
}