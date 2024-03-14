DROP DATABASE IF EXISTS Usuarios;
CREATE DATABASE Usuarios;
USE Usuarios;

-- Creación de la tabla 'USUARIO'
CREATE TABLE IF NOT EXISTS USUARIO (
    Carnet BIGINT PRIMARY KEY NOT NULL,
    Nombre VARCHAR(100),
    Apellido VARCHAR(100),
    Correo VARCHAR(50),
    Contrasena VARCHAR(50)
);

-- Creación de la tabla 'CATEDRATICO'
CREATE TABLE IF NOT EXISTS CATEDRATICO (
    idcatedratico INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100)
);

-- Creación de la tabla 'CURSO'
CREATE TABLE IF NOT EXISTS CURSO (
    idcurso INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100),
    Creditos INT
);

-- Creación de la tabla 'PUBLICACION'
CREATE TABLE IF NOT EXISTS PUBLICACION (
    idpublicacion INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(500),
    Fecha DATE,
    FK_Catedratico INT,
    Fk_Usuario BIGINT,
    Fk_Curso INT,
    FOREIGN KEY (Fk_Usuario) REFERENCES USUARIO(Carnet),
    FOREIGN KEY (FK_Catedratico) REFERENCES CATEDRATICO(idcatedratico),
    FOREIGN KEY (Fk_Curso) REFERENCES CURSO(idcurso)
);

-- Creación de la tabla 'COMENTARIO'
CREATE TABLE IF NOT EXISTS COMENTARIO (
    idcomentario INT AUTO_INCREMENT PRIMARY KEY,
    Fk_idpublicacion INT,
    Fk_Usuario BIGINT,
    Comentario VARCHAR(500),
    Fecha DATE,
    FOREIGN KEY (Fk_Usuario) REFERENCES USUARIO(Carnet),
    FOREIGN KEY (Fk_idpublicacion) REFERENCES PUBLICACION(idpublicacion)
);

-- Creación de la tabla 'ASIGNACION'
CREATE TABLE IF NOT EXISTS ASIGNACION (
    idasignacion INT AUTO_INCREMENT PRIMARY KEY,
    Fecha DATE,
    Fk_Usuario BIGINT,
    Fk_Curso INT,
    FOREIGN KEY (Fk_Usuario) REFERENCES USUARIO(Carnet),
    FOREIGN KEY (Fk_Curso) REFERENCES CURSO(idcurso)
);

-- Insertar datos de ejemplo
INSERT INTO USUARIO (Carnet, Nombre, Apellido, Correo, Contrasena) VALUES (20200045, 'LUIS', 'cubo de hielo', 'viejito@gmail.com', '123');
INSERT INTO CURSO (Nombre, Creditos) VALUES ('Logica de sistemas', 2);
INSERT INTO CURSO (Nombre, Creditos) VALUES ('Introduccion a la programacion y computacion 1', 4);
INSERT INTO CURSO (Nombre, Creditos) VALUES ('Lenguajes formales y de programacion', 3);
INSERT INTO CURSO (Nombre, Creditos) VALUES ('Introduccion a la programacion y computacion 2', 5);
INSERT INTO CURSO (Nombre, Creditos) VALUES ('Organizacion computacional', 3);
INSERT INTO CATEDRATICO (Nombre) VALUES ('Pepito');
INSERT INTO PUBLICACION (Descripcion, Fecha, FK_Catedratico, Fk_Usuario) VALUES ('Prueba 1', CURDATE(), 1, 20200045);
