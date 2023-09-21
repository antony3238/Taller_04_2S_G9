import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//IMPORTS DE COMPONENTES
import {LoginComponent} from './Commponents/login/login.component';
import {ContrasenaComponent} from './Commponents/contrasena/contrasena.component';
import {HomeComponent} from './Commponents/home/home.component';
import {RegistroComponent} from './Commponents/registro/registro.component';
import {PerfilComponent} from './Commponents/perfil/perfil.component'
import { PublicacionComponent } from './Commponents/publicacion/publicacion.component';
import { CursosaprobadosComponent } from './Commponents/cursosaprobados/cursosaprobados.component';
import { AgregarCursoComponent } from './Commponents/agregar-curso/agregar-curso.component';
import {ModificarDatosComponent} from './Commponents/modificar-datos/modificar-datos.component'
import {VisitarPerfilComponent} from './Commponents/visitar-perfil/visitar-perfil.component'
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password',
    component: ContrasenaComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'publicacion',
    component: PublicacionComponent
  },
  {
    path: 'Agregar curso',
    component: AgregarCursoComponent
  },
  {
    path: 'Modificar',
    component: ModificarDatosComponent
  },
  {
    path:'Vperfil',  
    component:VisitarPerfilComponent
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
