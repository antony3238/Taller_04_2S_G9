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

module.exports = {Listcourses,Listcate}