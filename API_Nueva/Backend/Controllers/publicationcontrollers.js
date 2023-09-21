const pool = require("../DataBase/Database");


const addpublication = async (req, res) => {

    const publi = req.body;
    console.log(publi);
    try {

        //Verificamos que si envian un catedratico o un curso o ambos
        if (publi.curso == -1) {
            console.log('No trae curso pero si catedratico')

            //Primero ingresamos el catedratico 
            let querycatedratico = `SELECT * FROM CATEDRATICO WHERE Nombre='${publi.cate}'`;
            let idcatedratico;
            GuardarCate(publi.cate);
            await new Promise(resolve => setTimeout(resolve, 200));

            //Paso dos: buscamos el id del catedratico creado
            await pool.conexion.query(querycatedratico, async (err, result) => {
                console.log(result[0].idcatedratico);
                idcatedratico = result[0].idcatedratico

                //Paso tres: ingresamos la publicacion sin curso
                let querypublicacion = `INSERT INTO PUBLICACION(Descripcion, Fecha, FK_Catedratico, Fk_Usuario)VALUES('${publi.desc}', DATE_FORMAT(DATE_SUB(now(), INTERVAL 6 HOUR), '%Y-%m-%d'), ${idcatedratico}, ${publi.carne})`;
                console.log(querypublicacion);
                await new Promise(resolve => setTimeout(resolve, 200));
                await pool.conexion.query(querypublicacion, async (err, result) => {
                    if (result.length != 0) {
                        res.status(200).json({
                            'success': true,
                            'message': "Publicacion creado exitosamente"
                        });
                    } else {
                        res.status(400).json({
                            'success': false,
                            'message': "Ocurrio un error al crear la publicacion " + err
                        });

                    }

                })

            })


        } else if (publi.cate == 'null') {
            console.log('No trae catedratico pero si curso');
            //Paso tres: ingresamos la publicacion sin curso
            let querypublicacion = `INSERT INTO PUBLICACION(Descripcion, Fecha, Fk_Curso, Fk_Usuario)VALUES('${publi.desc}', DATE_FORMAT(DATE_SUB(now(), INTERVAL 6 HOUR), '%Y-%m-%d'), ${publi.curso}, ${publi.carne})`;
            console.log(querypublicacion);
            await new Promise(resolve => setTimeout(resolve, 200));
            await pool.conexion.query(querypublicacion, async (err, result) => {
                if (result.length != 0) {
                    res.status(200).json({
                        'success': true,
                        'message': "Publicacion creado exitosamente"
                    });
                } else {
                    res.status(400).json({
                        'success': false,
                        'message': "Ocurrio un error al crear la publicacion " + err
                    });

                }

            })


        } else {
            console.log('trae catedratico y curso')


            //Primero ingresamos el catedratico 
            let querycatedratico = `SELECT * FROM CATEDRATICO WHERE Nombre='${publi.cate}'`;
            let idcatedratico;
            GuardarCate(publi.cate);
            await new Promise(resolve => setTimeout(resolve, 200));

            //Paso dos: buscamos el id del catedratico creado
            await pool.conexion.query(querycatedratico, async (err, result) => {
                console.log(result[0].idcatedratico);
                idcatedratico = result[0].idcatedratico

                //Paso tres: ingresamos la publicacion sin curso
                let querypublicacion = `INSERT INTO PUBLICACION(Descripcion, Fecha, FK_Catedratico, Fk_Curso, Fk_Usuario)VALUES('${publi.desc}', DATE_FORMAT(DATE_SUB(now(), INTERVAL 6 HOUR), '%Y-%m-%d'), ${idcatedratico}, ${publi.curso}, ${publi.carne})`;
                console.log(querypublicacion);
                await new Promise(resolve => setTimeout(resolve, 200));
                await pool.conexion.query(querypublicacion, async (err, result) => {
                    if (result.length != 0) {
                        res.status(200).json({
                            'success': true,
                            'message': "Publicacion creado exitosamente"
                        });
                    } else {
                        res.status(400).json({
                            'success': false,
                            'message': "Ocurrio un error al crear la publicacion " + err
                        });

                    }

                })

            })

        }


    } catch (error) {
        res.status(200).json({ 'success': false, 'message': 'Existe un error inesperado ' + error })
    }
}

GuardarCate = async (nombre) => {
    let queryCategoria = `SELECT * FROM CATEDRATICO WHERE Nombre='${nombre}'`;

    await pool.conexion.query(queryCategoria, async (err, result) => {

        if (result.length != 0) {
            console.log("Existe el catedratico " + nombre)
        } else {
            let queryInsertCategoria = `INSERT INTO CATEDRATICO (Nombre) VALUES ('${nombre}')`;

            await pool.conexion.query(queryInsertCategoria, async (err, result) => {

                console.log("Se guardo el catedratico " + nombre)

            });
        }
    });

}

const listpublications = async (req, res) => {

    try {
        await pool.conexion.query(`select P.idpublicacion, P.Descripcion, P.fecha, U.Nombre, C.Nombre AS 'Catedratico', CU.Nombre AS 'Curso' from PUBLICACION AS P
        INNER JOIN USUARIO AS U ON P.Fk_Usuario = U.Carnet
        LEFT JOIN CATEDRATICO AS C ON P.FK_Catedratico = C.idcatedratico
        LEFT JOIN CURSO AS CU ON P.Fk_Curso = CU.idcurso`, async (err, result) => {
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

const mylistpublications = async (req, res) => {
    const publi = req.body;

    try {
        await pool.conexion.query(`SELECT * FROM PUBLICACION WHERE Fk_Usuario = ${publi.carne}`, async (err, result) => {
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


module.exports = { addpublication, listpublications, mylistpublications }