import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//IMPORTS DE COMPONENTES
import {LoginComponent} from './Commponents/login/login.component';
import {ContrasenaComponent} from './Commponents/contrasena/contrasena.component';
import {HomeComponent} from './Commponents/home/home.component';
import {RegistroComponent} from './Commponents/registro/registro.component';

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
