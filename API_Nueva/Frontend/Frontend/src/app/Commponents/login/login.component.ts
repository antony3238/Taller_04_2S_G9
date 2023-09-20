import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Temporal_Login = {
    carne: 0,
    pass: null
  }

  constructor(private router: Router, private serviceservice: ServiceService) { }

  ngOnInit() { 
    localStorage.clear();
  }

  Prueba() {
    if (this.Temporal_Login.carne == 0) {
      alert("Ingrese el numero de registro academico");
    } else if (this.Temporal_Login.pass == null) {
      alert("Ingrese su contrasena");
    } else {

      try {
        this.serviceservice.SLogin(this.Temporal_Login).subscribe(
          res => {
            var temp2: any = res;
            //console.log(temp2.message);
            localStorage.setItem('usuario', JSON.stringify(temp2.message));
            this.router.navigate(['home']);
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
