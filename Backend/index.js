'use strict'

var port = 3800; // Puerto de la aplicacion
var app = require('./app');


app.listen(port, ()=>{
    console.log('Servidor corriendo con express', port);

});

