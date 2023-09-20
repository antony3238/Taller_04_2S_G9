import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';
@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css']
})
export class ContrasenaComponent  implements OnInit {
  
  Temporal = {
    carne: 0,
    correo:null,
    pass: null
  }

  ngOnInit() { 
  }
  constructor(private router: Router, private serviceservice: ServiceService) { 

  }
  actualizar() {
    if (this.Temporal.carne == 0) {
      alert("Ingrese el numero de registro academico");
    } else if (this.Temporal.correo == null) {
      alert("Ingrese su correo electronico");
    }else if(this.Temporal.pass == null){
      alert("Ingrese la contraseña nueva")
    } else {

      try {
        this.serviceservice.SActualizarPass(this.Temporal).subscribe(
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
