/* Version Control 
Created: 2021-06-09
- Import Mysql Variable of database.js
- Created functions to login, register, listen, find, update and delete users
- Export Functions
*/
'user controller'

const mysqlFunctions = require('../database/database');
var jwt = require('../services/jwt');


const querySelect = 'Select * From Users Where registroAcademico = ?';

/* Login Function */
function login(req, res){
    var data = req.body;
    var data_registroAcademico = data.registroAcademico;
    mysqlFunctions.query('Select * From Users Where registroAcademico = ?', [data_registroAcademico], (err, rows, field)=>{ 
        if(err){
            res.status(500).send({message: 'Error gneral en el sistema', err});
        }else if(rows){
            for(let i = 0; i < rows.length; i++){
                var userPass = rows[i].passwordU;//Declaration of Variable Password of the User
                var userData = rows[i];
            }
            if(data.passwordU == userPass){// Comparison of Password entered by registroAcademico and Password previously registered
                
                res.send({token: jwt.createToken(userData), users: userData, mesage: 'Registro Academico y Contraseña Correctos'});
            }else{
                res.send({message: 'Contraseña o Registro Academico Incorrectos'});
            }            
        }else{
            res.status(402).send({message: 'No existe un usuario con este correo'});
        }
    })
}

// CRUD Functions USUARIOS
// Function to Register User
function registerUser(req, res){
    var {registroAcademico, nameU, lastnameU, email, passwordU} = req.body
    mysqlFunctions.query('call sp_registerUser(?,?,?,?,?)', [registroAcademico, nameU, lastnameU, email, passwordU], (err, rows, fields)=>{
        if(err){
             res.status(500).send({message: 'Error general en el servidor', err});
        }else if(rows){
             res.send({user: rows});
        }else{
            res.status(402).send({message: 'No se pudo realizar la peticion'});
        }
    });
}

//Function to List Users
function findUsers(req, res){
    mysqlFunctions.query('Select * From Users', (err, rows, fields)=>{
        if(err){
            res.status(500).send({message: 'Error general en el servidor', err});
        }else if(rows){
            res.send({users: rows});
        }else{
            res.status(402).send({message: 'No se pudieron listar los usuarios'});
        }
    });
}

//Function to Find User
function findOneUser(req, res){
    var data = req.body;
    var par_registroAcademico = data.registroAcademico;

    if(par_registroAcademico == ''){// Validation of empty fields
        res.status(402).send({message: 'Debe de ingresar un dato de busqueda'});
    }else{
        mysqlFunctions.query(querySelect, [par_registroAcademico], (err, rows, fields)=>{
            if(err){
                res.status(500).send({message: 'Error general en el servidor', err});
            }else if(rows){
                res.send({message: 'Usuario encontrado', rows});
            }else{
                res.status(402).send({message: 'No se encontro al usuario'});
            }
            
        });
    }
    
}

// Function para modificar contraseña
function updatePasswordUser(req, res){
    var {emailU, passwordU } = req.body; 
    
    mysqlFunctions.query('select * from Users where email = ?', [emailU], (err, result_user)=>{
        if(err){
            res.status(500).send({message: 'Error no encontro el email', err});
        }else if(result_user.length > 0){
                mysqlFunctions.query('update Users set passwordU = ? where email = ?', [passwordU, emailU], (err, result) => {
                    if(err){
                        res.status(500).json({error: 'Error al actualizar la contraseña'});
                    }else{
                        res.status(200).json({message: 'Contraseña actualizada con éxito'});
                }});
        }else{
            res.status(402).send({message: 'No se pudieron actualizar los datos'});
        }
    })
}

function view_profile_users(req, res) {
    const carnet = req.params.carnet;
    const data = req.body;
    const user = req.user.sub;
    
    mysqlFunctions.query('select * from Users where registroAcademico = ?', [carnet], (err, result_user) => {
        if(err){
            res.status(500).json({error: 'Error al buscar el usuario'});
        }else{
            if(result_user.length > 0){
                if(result_user[0].registroAcademico == user){
                    mysqlFunctions.query('update Users set nameU = ?, lastnameU = ?, email = ?, passwordU = ? where registroAcademico = ?', [data.nameU, data.lastnameU, data.email, data.passwordU, carnet], (err, result) => {
                        if(err){
                            res.status(500).json({error: 'Error al actualizar el usuario'});
                        }else{
                            mysqlFunctions.query('select * from Users where registroAcademico = ?', [carnet], (err, resul_modify) => {
                                if(err){
                                    res.status(500).json({error: 'Error al buscar el usuario'});
                                }else{
                                    res.status(200).json({message: 'Usuario actualizado con éxito', resul_modify});
                        }});
                    }});

                }else{
                    res.status(200).json({RegistroAcademico: result_user[0].registroAcademico, 
                                          NombreUsuario: result_user[0].nameU,
                                          ApellidoUsuario: result_user[0].lastnameU,
                                          CorreoUsuario: result_user[0].email});
                }
        }
    }
})};


// Exports Function
module.exports = {
    registerUser,
    findUsers,
    findOneUser,
    updatePasswordUser,
    login,
    view_profile_users
}