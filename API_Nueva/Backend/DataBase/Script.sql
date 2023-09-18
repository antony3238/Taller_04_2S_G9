
Create Database Usuarios;
Use Usuarios;


-- Creacion de la Tabla de Usuarios
Create table Users(
	registroAcademico varchar(10) not null,
    nameU varchar(100) not null,
    lastnameU varchar(100) not null,
    email varchar(50) not null,
    passwordU varchar(50)not null,
    Primary Key PK_registroAcademico (registroAcademico)
);

-- Creacion de la Tabla de Publications
Create table Publications(
	id int auto_increment primary key,
	user varchar(250) not null,
	course varchar(250),   /* Curso */
    professor varchar(250), /* Catedratico */
	message text not null,
	creation_date timestamp default current_timestamp
);

-- Creacion de la Tabla de Comments
Create table Comments(
	id int auto_increment primary key,
	id_publication int not null,
	user varchar(250) not null,
	message text not null,
	creation_date timestamp default current_timestamp,
	foreign key (id_publication) references Publications(id)
);

 -- Creacion de la Tabla de Courses
Create table Courses(
	id int auto_increment primary key,
	user_code varchar(10) not null,
	course_name varchar(250) not null,
	credits decimal(10, 2) not null,
	foreign key (user_code) references Users(registroAcademico)
);


-- Creation of Procedures
-- Users

-- Create Procedure to register User
Delimiter $$ 
Create Procedure sp_registerUser(in par_registroAcademico varchar(10), in parNameU varchar(100), in parLastnameU varchar(100),in parEmail varchar(50), in parPasswordU varchar(50)) -- par -> Parameter
	Begin
		Insert into Users(registroAcademico, nameU, lastnameU, email, passwordU)
			values (par_registroAcademico, parNameU, parLastnameU, parEmail, parPasswordU);
	End$$
Delimiter ;

-- Create Procedure to find Users
Delimiter $$
Create procedure sp_findUsers()
	Begin
		Select * From Users;
	End$$
Delimiter ;

-- Create Procedure to findOneUser
Delimiter $$
Create procedure sp_findOneUser(in par_registroAcademico varchar(10))
	Begin
		Select * From Users Where registroAcademico = par_registroAcademico;
    End$$
Delimiter ;

-- Create Procedure to Delete User
Delimiter $$
Create procedure sp_dropUserInformation(in par_registroAcademico varchar(10)) -- par -> Parameter
	Begin
		Delete from Users Where registroAcademico = par_registroAcademico;
    End$$
Delimiter ;

-- Create Procedure to Update User
Delimiter $$
Create Procedure sp_updateUser(in par_registroAcademico varchar(10), in parPasswordU varchar(50)) -- par -> Parameter
	Begin
		Update Users set passwordU = parPasswordU; 
	End$$
Delimiter ;

-- Call Procedure Register User
call sp_registerUser('202200271', 'Sergio', 'Rodas', 'joe@rodas.com', 'admin123');

Select * from Users;
select * from Publications;
select * from Comments;
