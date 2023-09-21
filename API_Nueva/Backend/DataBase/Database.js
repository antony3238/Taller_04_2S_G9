const mysql = require('mysql')

/*Credenciales de su base de datos*/
const conexion = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Vale0401*',
    database: 'usuarios'
  }
);

const Conectar = () => {
    conexion.connect( err => {
        if(err) throw err
        console.log("conectado a la DB");
    })
}


module.exports = {
    Conectar,
    conexion
}  