import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  user: any;

  NombreCurso: any;
  NombreCate: any;
  Desc: any;

  Temporal = {
    desc: "",
    carne: 0,
    cate: "null",
    curso: -1,

  };

  datacuros: any = [];
  datacate: any = [];

  constructor(private router: Router, private serviceservice: ServiceService) { }

  ngOnInit() {
    //Paso 1: Recuperar la informacion, nos regresa como string
    this.user = localStorage.getItem('usuario');

    if (this.user == null) {
      alert("INGRESE SU REGISTRO ACADEMICO EN LA PAGINA INICIAL");
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      //Paso 2: Transformarlo a un objeto
      this.Transformar();
      this.ListaCursos();
      this.ListaCatedraticos();
      this.NombreCurso = -1;
      this.NombreCate = null;
      this.Desc = null;
    }

  }




  Transformar() {

    var Datos2: any;
    Datos2 = JSON.parse(this.user);
    console.log(Datos2);
    this.Temporal.carne = Datos2.Carnet;

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

  ListaCatedraticos() {
    this.serviceservice.getCatedraticos().subscribe(
      res => {
        // @ts-ignore
        this.datacate = Array.from(res.message);
        console.log(this.datacate);
      },
      error => {
        var temp2: any = error;
        alert(temp2.message);
      });
  }

  IngresarPublicacion() {

    this.Temporal.desc = this.Desc;

    if (this.NombreCurso == -1) {
      this.Temporal.cate = this.NombreCate;

      try {
        this.serviceservice.SRegistrarPubli(this.Temporal).subscribe(
          res => {
            var temp2: any = res;
            console.log(temp2.message);

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

    } else if (this.NombreCate == null) {
      console.log(this.NombreCurso);
      //Forma para buscar el ID del curso seleccionado
      // @ts-ignore
      let Curso = this.datacuros.find(y => y.Nombre == this.NombreCurso);
      this.Temporal.curso = Curso.idcurso

      try {
        this.serviceservice.SRegistrarPubli(this.Temporal).subscribe(
          res => {
            var temp2: any = res;
            console.log(temp2.message);

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

    } else {
      //Forma para buscar el ID del curso seleccionado
      // @ts-ignore
      let Curso = this.datacuros.find(y => y.Nombre == this.NombreCurso);
      this.Temporal.curso = Curso.idcurso;
      this.Temporal.cate = this.NombreCate;

      try {
        this.serviceservice.SRegistrarPubli(this.Temporal).subscribe(
          res => {
            var temp2: any = res;
            console.log(temp2.message);

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

    }

    this.Temporal.desc = "";
    this.Temporal.cate = "null";
    this.Temporal.curso = -1;


    this.NombreCurso = -1;
    this.NombreCate = null;
    this.Desc = null;

    this.ListaCatedraticos();
    this.ListaCatedraticos();
    
  }

}
