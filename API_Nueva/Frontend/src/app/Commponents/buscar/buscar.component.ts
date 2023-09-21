import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  Total: any;
  Nombre: any;
  Apellido: any;
  Correo: any;
  Carnet: any;
  Estudiante: any;
  ListaEstudiantes: any = [];
  user: any;
  Temporal = {
    carne: 0
  };

  Datos2: any;

  constructor(private router: Router, private serviceservice: ServiceService) { }

  ngOnInit() {
    //Paso 1: Recuperar la informacion, nos regresa como string
    this.user = localStorage.getItem('usuario');
    this.Nombre = "";
    this.Apellido = "";
    this.Correo = "";
    this.Carnet = 0;
    this.Total = 0;
    this.Estudiante = "";
    if (this.user == null) {
      alert("INGRESE SU REGISTRO ACADEMICO EN LA PAGINA INICIAL");
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      //Paso 2: Transformarlo a un objeto
      this.Transformar();
      this.MisCursos();
    }

  }

  Transformar() {

    this.Datos2 = JSON.parse(this.user);
    console.log(this.Datos2);
    //this.Temporal.carne = this.Datos2.Carnet;

  }

  MisCursos() {

    try {
      this.serviceservice.getUsers(this.Temporal).subscribe(
        res => {
          // @ts-ignore
          this.ListaEstudiantes = Array.from(res.message);
          console.log(this.ListaEstudiantes);
        },
        error => {
          var temp2: any = error;
          alert(temp2.message);
        });
    } catch (error) {
      alert(error);
    }

  }

  BuscarES() {
    //Forma para buscar el ID del curso seleccionado
    // @ts-ignore
    let Estu = this.ListaEstudiantes.find(y => y.Carnet == this.Estudiante);
    this.Carnet = Estu.Carnet;
    this.Nombre = Estu.Nombre;
    this.Apellido = Estu.Apellido;
    this.Correo = Estu.Correo;
    this.Total = 0;
    console.log(Estu);
    this.Temporal.carne = this.Carnet
    this.BuscarCreditos();
  }

  BuscarCreditos() {

    try {
      this.serviceservice.STotalCreditos(this.Temporal).subscribe(
        res => {
          // @ts-ignore
          this.Total = res.message;
          console.log(this.Total);
        },
        error => {
          var temp2: any = error;
          alert(temp2.message);
        });
    } catch (error) {
      alert(error);
    }
  }
}
