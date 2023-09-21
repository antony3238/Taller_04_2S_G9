import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private serviceservice: ServiceService) { }

  datapublicidad:any = [];
  user: any
  comentario:any

  Temporal={
    publi:0,
    carne:0,
    comentario:""
  }

  ngOnInit() {

    //Paso 1: Recuperar la informacion, nos regresa como string
    this.user = localStorage.getItem('usuario');

    if (this.user == null) {
      alert("INGRESE SU REGISTRO ACADEMICO EN LA PAGINA INICIAL");
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      //Paso 2: Transformarlo a un objeto
      this.Transformar();
      this.ListaPublicaciones();
      
    }

  }

  Transformar() {

    var Datos2: any;
    Datos2 = JSON.parse(this.user);
    console.log(Datos2);
    this.Temporal.carne=Datos2.Carnet

  }

  ListaPublicaciones() {
    this.serviceservice.getPublicaciones().subscribe(
      res => {
        // @ts-ignore
        this.datapublicidad = Array.from(res.message);
        console.log(this.datapublicidad);
      },
      error => {
        var temp2: any = error;
        alert(temp2.message);
      });
  }

  ListaComentarios(idPublicacion: number) {
    this.serviceservice.SListaComentario({ publi: idPublicacion }).subscribe(
      res => {
        // @ts-ignore
        const comentarios = Array.from(res.message);
        console.log(comentarios);
        // Encuentra la publicación correspondiente por su ID
        const publicacion = this.datapublicidad.find((objeto: any) => objeto.idpublicacion === idPublicacion);
  
        // Asigna los comentarios a la publicación
        if (publicacion) {
          publicacion.comentarios = comentarios;
          publicacion.carne=comentarios[1];
        }
      },
      error => {
        var temp2: any = error;
        alert(temp2.message);
      }
    );
  }
  verComentarios(idPublicacion: number) {
    console.log("ID de la publicación seleccionada:", idPublicacion);
    this.Temporal.publi=idPublicacion;
    this.ListaComentarios(idPublicacion)
  }
  Pcomentario(){
      
    if (this.Temporal.comentario == "" ) {
      alert("Agrega tu comentario");
    } else {
      
      try {
        console.log(this.Temporal)
        this.serviceservice.SComentario(this.Temporal).subscribe(
          res => {
            var temp2: any = res;
            alert(temp2.message)
            this.router.navigate(['home']);
          },
          error => {
            var temp2: any = error;
            alert(temp2.error.message);
          }
        );
      } catch (error) {
        alert(error);
      }

    }

  }

}
