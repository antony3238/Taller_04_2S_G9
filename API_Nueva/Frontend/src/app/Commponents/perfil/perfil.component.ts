import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/service.service';
import { BsModalService,BsModalRef  } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  @ViewChild('myModal') myModal: any;
  constructor(private router: Router, private serviceservice: ServiceService,private modalService: BsModalService) { }
  user: any

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
  
  Transformar() {

    var Datos2: any;
    Datos2 = JSON.parse(this.user);
    console.log(Datos2);
    this.Temporal.carne = Datos2.Carnet;
    this.Temporal.nombre = Datos2.Nombre;
    this.Temporal.apellido = Datos2.Apellido;
    this.Temporal.correo=Datos2.Correo;
  }
  openModal() {
    this.modalService.show('myModal');
  }
  
  GuardarCambios() {
    // Aquí puedes agregar la lógica para guardar los cambios en tu servicio o donde sea necesario.
    // Por ejemplo, podrías hacer una llamada a tu servicio de actualización de perfil aquí.
    // Después de guardar, puedes cerrar el modal.
    this.modalService.hide(1); // Cierra el modal con ID 1 (myModal)
  }

}
