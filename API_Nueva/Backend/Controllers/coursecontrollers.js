const pool = require("../DataBase/Database");

const Listcourses = async (req, res) => {

    try {
        await pool.conexion.query(`SELECT * FROM CURSO`, async (err, result) => {
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

const Listcate = async (req, res) => {
    try {
        await pool.conexion.query(`SELECT * FROM CATEDRATICO`, async (err, result) => {
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

const addCurso = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`INSERT INTO ASIGNACION(Fecha, Fk_Usuario, Fk_Curso)
                                   VALUES(DATE_FORMAT(DATE_SUB(now(), INTERVAL 6 HOUR), '%Y-%m-%d'), ${user.carne}, ${user.curso})`,
            async (err, result) => {
                if (err) {
                    res.status(400).json({
                        'success': false,
                        'message': "Ocurrio un error al asignarse el curso " + err
                    });
                }
                if (result.length != 0) {
                    res.status(200).json({
                        'success': true,
                        'message': "Curso asignado exitosamente"
                    });
                } else {
                    res.status(400).json({
                        'success': false,
                        'message': "Ocurrio un error al asignarse el curso " + err
                    });

                }
            });

    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}

const MyCourses = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`SELECT C.Nombre AS 'Nombre', C.Creditos AS 'Credito'
        FROM ASIGNACION AS A
        INNER JOIN CURSO AS C ON C.idcurso = A.Fk_Curso
        INNER JOIN USUARIO AS U ON U.Carnet = A.Fk_Usuario
        WHERE U.Carnet = ${user.carne};`, async (err, result) => {
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

module.exports = { Listcourses, Listcate, addCurso, MyCourses }