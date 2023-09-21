import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';
@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.css']
})
export class AgregarCursoComponent implements OnInit {
  user: any;
  NombreCurso: any;

  Temporal = {
    carne: 0,
    curso: -1,
  };

  Datos2: any;
  datacuros: any = [];

  constructor(private router: Router, private serviceservice: ServiceService) { }

  ngOnInit() {
    //Paso 1: Recuperar la informacion, nos regresa como string
    this.user = localStorage.getItem('usuario');
    this.NombreCurso = "";

    if (this.user == null) {
      alert("INGRESE SU REGISTRO ACADEMICO EN LA PAGINA INICIAL");
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      //Paso 2: Transformarlo a un objeto
      this.Transformar();
      this.ListaCursos();
    }

  }

  Transformar() {

    this.Datos2 = JSON.parse(this.user);
    console.log(this.Datos2);
    this.Temporal.carne = this.Datos2.Carnet;

  }

  ListaCursos() {
    this.serviceservice.getCursos().subscribe(
      res => {
        // @ts-ignore
        this.datacuros = Array.from(res.message);
        console.log(this.datacuros);
      },
      error => {
        var temp2: any = error;
        alert(temp2.message);
      });
  }

  Asignar() {
      //Forma para buscar el ID del curso seleccionado
      // @ts-ignore
      let Curso = this.datacuros.find(y => y.Nombre == this.NombreCurso);
      this.Temporal.curso = Curso.idcurso
      console.log(this.Temporal);

    try {
        this.serviceservice.SAsignar(this.Temporal).subscribe(
          res => {
            var temp2: any = res;
            console.log(temp2.message);
            alert(temp2.message);
          },
          error => {
            var temp2: any = error;
            //console.log(temp2);
            //console.log(temp2.error.message);
            alert(temp2.error.message);
          }
        );
      } catch (error) {
        alert(error);
      }


    this.Temporal.curso = -1;
    this.NombreCurso = "";

  }


}
