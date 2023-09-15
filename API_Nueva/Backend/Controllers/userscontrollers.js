const pool = require("../DataBase/Database");

const addUser = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`Insert into Users(registroAcademico, nameU, lastnameU, email, passwordU) 
        values (${user.carne}, '${user.nombre}', '${user.apellido}', '${user.correo}', '${user.pass}');`, async (err, result) => {
            if (err) {
                res.status(400).json({
                    'success': false,
                    'message': "Ocurrio un error al crear el usuario " + err
                });
            }
            if (result.length != 0) {
                res.status(200).json({
                    'success': true,
                    'message': "Usuario creado exitosamente"
                });
            } else {
                res.status(400).json({
                    'success': false,
                    'message': "Ocurrio un error al crear el usuario " + err
                });

            }

        });


    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}

const updateUser = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`Insert into Users(registroAcademico, nameU, lastnameU, email, passwordU) 
        values (${user.carne}, '${user.nombre}', '${user.apellido}', '${user.correo}', '${user.pass}');`, async (err, result) => {
            if (err) {
                res.status(400).json({
                    'success': false,
                    'message': "Ocurrio un error al crear el usuario " + err
                });
            }
            if (result.length != 0) {
                res.status(200).json({
                    'success': true,
                    'message': "Usuario creado exitosamente"
                });
            } else {
                res.status(400).json({
                    'success': false,
                    'message': "Ocurrio un error al crear el usuario " + err
                });

            }

        });

    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}


module.exports= { addUser }