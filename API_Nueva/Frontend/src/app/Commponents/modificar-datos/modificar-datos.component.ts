import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';
@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit{
  user:any

  Temporal = {
    carne: 0,
    nombre:null,
    apellido:null,
    correo:null,
    pass: null
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
   
    }

  }
    constructor(private router: Router, private serviceservice: ServiceService) { 
  
    }
    Transformar() {
      var Datos2: any;
      Datos2 = JSON.parse(this.user);
      console.log(Datos2);
      this.Temporal.carne=Datos2.Carnet
    }
    Editar(){
      if (this.Temporal.correo == null || this.Temporal.nombre == null ||  this.Temporal.apellido == null ||  this.Temporal.pass == null) {
        alert("Llena todos los datos");
      } else {
        try {
          this.serviceservice.Seditar(this.Temporal).subscribe(
            res => {
              var temp2: any = res;
              //console.log(temp2.message);
              //localStorage.setItem('usuario', JSON.stringify(temp2.message)); 
              alert(temp2.message)
              this.router.navigate(['login']);
              //console.log(temp2.message[0]);
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

    }
}
