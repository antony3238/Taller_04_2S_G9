const pool = require("../DataBase/Database");

const Login = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`SELECT U.Carnet AS 'Carnet', U.Nombre AS 'Nombre', U.Apellido AS 'Apellido', U.Correo AS 'Correo', U.Contrasena AS 'Contrasena', SUM(C.Creditos) AS 'Total'
        FROM ASIGNACION AS A
        INNER JOIN CURSO AS C ON C.idcurso = A.Fk_Curso
        INNER JOIN USUARIO AS U ON U.Carnet = A.Fk_Usuario
        WHERE Carnet = ${user.carne} and Contrasena = '${user.pass}'`,

            async (err, result) => {

                if (result.Carnet == null) {
                    console.log("entro");
                    await pool.conexion.query(`SELECT * FROM USUARIO WHERE Carnet = ${user.carne} and Contrasena = '${user.pass}'`,

                        async (err, result) => {
                            if (result.length != 0) {
                                res.status(200).json({
                                    'success': true,
                                    'message': result[0]
                                });
                            } else {
                                res.status(400).json({
                                    'success': false,
                                    'message': "El usuario no esta registrado"
                                });

                            }
                        });

                    } else {
                    if (result.length != 0) {
                        res.status(200).json({
                            'success': true,
                            'message': result[0]
                        });
                    } else {
                        res.status(400).json({
                            'success': false,
                            'message': "El usuario no esta registrado"
                        });

                    }
                }
            });

    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}

const addUser = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`INSERT INTO USUARIO(Carnet, Nombre, Apellido, Correo, Contrasena) 
        VALUES (${user.carne}, '${user.nombre}', '${user.apellido}', '${user.correo}', '${user.pass}');`, async (err, result) => {
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
        await pool.conexion.query(`UPDATE USUARIO SET Nombre = '${user.nombre}', Apellido = '${user.apellido}', Correo = '${user.correo}', Contrasena = '${user.pass}'
                                   WHERE Carnet = ${user.carne}`, async (err, result) => {
            if (result.length != 0) {
                res.status(200).json({
                    'success': true,
                    'message': "Usuario modificado exitosamente"
                });
            } else {
                res.status(400).json({
                    'success': false,
                    'message': "Ocurrio un error al modificar el usuario"
                });

            }

        });

    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}

const ListUser = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`SELECT * FROM USUARIO WHERE Carnet != ${user.carne}`, async (err, result) => {
            if (result.length != 0) {
                res.status(200).json({
                    'success': true,
                    'message': result[0]
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

const MydataUser = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`SELECT * FROM USUARIO WHERE Carnet = ${user.carne}`, async (err, result) => {
            if (result.length != 0) {
                res.status(200).json({
                    'success': true,
                    'message': result[0]
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

const ForgotPassword = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`UPDATE USUARIO SET Contrasena = '${user.pass}' WHERE Carnet = ${user.carne} AND Correo = '${user.correo}'`
            , async (err, result) => {

                
                if (result.affectedRows != 0) {
                    res.status(200).json({
                        'success': true,
                        'message': "Password restablecido"
                    });
                } else {
                    res.status(400).json({
                        'success': false,
                        'message': "Ocurrio un error verifique Correo y Registro Academico"
                    });

                }

            });

    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}

const TotalCreditos = async (req, res) => {

    const user = req.body;

    try {
        await pool.conexion.query(`SELECT IFNULL(SUM(C.Creditos), 0) AS 'Total'
        FROM ASIGNACION AS A
        INNER JOIN CURSO AS C ON C.idcurso = A.Fk_Curso
        INNER JOIN USUARIO AS U ON U.Carnet = A.Fk_Usuario WHERE Carnet = ${user.carne}`,

            async (err, result) => {
                if (result.length != 0) {
                    res.status(200).json({
                        'success': true,
                        'message': result[0]
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



module.exports = { addUser, Login, updateUser, ListUser, MydataUser, ForgotPassword, TotalCreditos }