import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor(private router: Router, private serviceservice: ServiceService) { }
  user: any
  NombreCurso: any;
  NombreCate: any;
  Desc: any;
  ngOnInit() {
    
    //Paso 1: Recuperar la informacion, nos regresa como string
    this.user = localStorage.getItem('usuario');

    if (this.user == null) {
      alert("INGRESE SU REGISTRO ACADEMICO EN LA PAGINA INICIAL");
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      //Paso 2: Transformarlo a un objeto
      this.Transformar();
    }

  }
  
  Transformar() {

    var Datos2: any;
    Datos2 = JSON.parse(this.user);
    console.log(Datos2);
  }

}
