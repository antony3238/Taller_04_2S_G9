import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  user: any
  Temporal = {
    carne:"",
    cate:"",
    curso:"",
    desc:""
  }

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
    
        }
        
  }



  
  Transformar() {

    var Datos2: any;
    Datos2 = JSON.parse(this.user);
    console.log(Datos2);
    
    // Obtener la fecha actual
    const fechaActual = new Date();
    
    // Puedes formatear la fecha como desees, por ejemplo, a una cadena de texto
    const fechaFormateada = fechaActual.toISOString(); // Formato ISO 8601

    // Ahora puedes usar la fecha en tu componente según sea necesario
    console.log('Fecha actual:', fechaFormateada);

  }

}
