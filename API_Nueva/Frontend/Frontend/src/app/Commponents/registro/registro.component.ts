import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  Temporal = {
    carne: 0,
    nombre:null,
    apellido:null,
    correo:null,
    pass: null
  }
  /*{
    "carne":202201989,
    "nombre":"Maria",
    "apellido":"Serrano",
    "correo":"maria@gmail.com",
    "pass":"123"
}*/
ngOnInit() { 
}
  constructor(private router: Router, private serviceservice: ServiceService) { 

  }
  Registrar(){
    if (this.Temporal.carne == 0 || this.Temporal.correo == null || this.Temporal.nombre == null ||  this.Temporal.apellido == null ||  this.Temporal.pass == null) {
      alert("Llena todos los datos");
    } else {
      try {
        this.serviceservice.SRegistrar(this.Temporal).subscribe(
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
