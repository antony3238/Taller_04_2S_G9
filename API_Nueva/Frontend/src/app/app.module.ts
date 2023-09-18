import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoginComponent } from './Commponents/login/login.component';
import { ContrasenaComponent } from './Commponents/contrasena/contrasena.component';
import { HomeComponent } from './Commponents/home/home.component';
import { RegistroComponent } from './Commponents/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContrasenaComponent,
    HomeComponent,
    RegistroComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
