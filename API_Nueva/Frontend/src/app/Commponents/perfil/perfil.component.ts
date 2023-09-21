import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private router: Router, private serviceservice: ServiceService) { }
  Total: any;
  ListaMisCursos: any = [];
  user: any

  Temporal = {
    carne: 0
  }
  Datos2: any;
  
  ngOnInit() {
    
    //Paso 1: Recuperar la informacion, nos regresa como string
    this.user = localStorage.getItem('usuario');

    if (this.user == null) {
      alert("INGRESE SU REGISTRO ACADEMICO EN LA PAGINA INICIAL");
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      //Paso 2: Transformarlo a un objeto
      this.Transformar();
      this.MisCursos();
      this.TotalCredits();
    }

  }
  
  Transformar() {

    this.Datos2 = JSON.parse(this.user);
    console.log(this.Datos2);
    this.Temporal.carne = this.Datos2.Carnet;
}
    MisCursos() {

      try {
        this.serviceservice.SMycourse(this.Temporal).subscribe(
          res => {
            // @ts-ignore
            this.ListaMisCursos = Array.from(res.message);
            console.log(this.ListaMisCursos);
          },
          error => {
            //var temp2: any = error;
            //alert(temp2.message);
          });
      } catch (error) {
        alert(error);
      }

    }

    TotalCredits() {

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