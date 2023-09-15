# Herramientas necesarias para montar una API con Angular y Nodejs

- Descargar Nodejs/npm -> [Link de descarga](https://nodejs.org/es/download)
- Descargar Postman -> [Link de descarga](https://www.postman.com/downloads/)
- Descargar Angular -> [Link de descarga](https://angular.io/guide/setup-local)

**NOTA : ANGULAR NO ES UN PROGRAMA, SE DESCARGA CON EL GESTOR DE PAQUETES DE NODEJS**

# Backend

 * ## Paso 1
    Ingresar el siguente comando en la terminal de visual code o en la termianl de su SO, dentro de la carpeta a utilizar.
    ```
    npm init -y
    ```

    Luego van a instalar las siguientes dependencias.
    ```
    npm i express
    ```
    ```
    npm i morgan
    ```
    ```
    npm i cors
    ```
    Tambien se puede ingresar en una linea de comando.
    ```
    npm i express morgan cors
    ```
    * Morgan: sirver para el control de peticiones en consola
    * Cors: Se utiliza para comunicarse con otros servidores dandoles

* ## Paso 2
    crear su archivo index con las configuraciones necesarias, revisar el archivo de la carpeta backend.

* ## Paso 3
    Instalar nodemon para evitar parar el servidor al momento de modificar el archivo index.js
    ```
    npm i nodemon -D
    ```

    Para ejecutar esta dependencia de desarrollo, tienen que modificar el package.json en la parte de scripts y ponerlo de la siguiente manera:
    ```json
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon index.js"
        }
    ```

    luego de dicha configuracion, en la consola ingresar el siguiente comando:
    ```
    npm run dev
    ```
* ## Paso 4
    Instalar la dependencia para manejar la comunicacion entre la base datos y el servidor (en este caso se usara Mysql)
    ```
    npm i mysql
    ```
    Crean un archivo donde tendran las configuracion necesarias para su base de datos.
    