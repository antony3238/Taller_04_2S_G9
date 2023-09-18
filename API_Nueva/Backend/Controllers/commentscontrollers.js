const pool = require("../DataBase/Database");

const addcomment = async (req, res) => {

    const comment = req.body;
    let querycomment = `INSERT INTO COMENTARIO(Fk_idpublicacion,Fk_Usuario,comentario,Fecha) 
    VALUES(${comment.publi},${comment.carne},${comment.comentario},DATE_FORMAT(DATE_SUB(now(), INTERVAL 6 HOUR), '%Y-%m-%d'))`;

    try {
        await pool.conexion.query(querycomment, async (err, result) => {
            if (result.length != 0) {
                res.status(200).json({
                    'success': true,
                    'message': "Se inserto el comentario corectamente en la DB"
                });
            } else {
                res.status(400).json({
                    'success': false,
                    'message': "Ocurrio un error en el server"
                });

            }

        });

    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}

const listcomment = async (req, res) => {

    const comment = req.body;
    let querycomment = `SELECT * FROM COMENTARIO WHERE Fk_idpublicacion = ${comment.publi}`;

    try {
        await pool.conexion.query(querycomment, async (err, result) => {
            if (result.length != 0) {
                res.status(200).json({
                    'success': true,
                    'message': result
                });
            } else {
                res.status(400).json({
                    'success': false,
                    'message': "Ocurrio un error en el server"
                });

            }

        });

    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}

module.exports = { addcomment, listcomment }