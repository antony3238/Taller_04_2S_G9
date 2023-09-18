import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  user: any

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
