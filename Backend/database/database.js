'use strict'

const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:'localhost',
    database:'Usuarios',
    user:'root',
    password:'admin123',
    
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexion exitosa ..!');
    }
});


module.exports = conexion;