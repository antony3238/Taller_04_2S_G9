const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const ConexionDB = require("./DataBase/Database")

/*Configuraciones del servidor*/
app.use(cors());/* Politicas del servidor */
app.use(morgan("dev")); /* Controlador de peticiones en consola*/

/* Configuraciones de archivos del servidor*/
app.use(
    express.json({
        limit: "200mb", /* El servidor aguanta archivos no mas de 200 mb */
    })
);
app.use(
    express.urlencoded({
        limit: "200mb", /* El servidor aguanta archivos no mas de 200 mb */
        extended: true,
    })
);
app.use(
    express.text({
        limit: "200mb", /* El servidor aguanta archivos no mas de 200 mb */
    })
);

/* Creacion de las rutas */
app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello from Backend" });
});

app.use("/Grupo9", require("./Routes/routes.js"));

app.listen(4000, () => {
    ConexionDB.Conectar()
    console.log("Servidor levantado con exito en el puerto " + 4000);
});