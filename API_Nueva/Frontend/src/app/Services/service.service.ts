import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  url = "";

  constructor(private http: HttpClient) { 
    this.url = "http://localhost:4000";
  }

  SLogin(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/Login', objeto);
  }
  SActualizarPass(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/ForgotPassword', objeto);
  }
  SRegistrar(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/addUser', objeto);
  }

  getPublicaciones(): Observable<any[]> {
    return this.http.get<any>(this.url + '/Grupo9/listpublications');
  }

  getCatedraticos(): Observable<any[]> {
    return this.http.get<any>(this.url + '/Grupo9/Listcate');
  }

  getCursos(): Observable<any[]> {
    return this.http.get<any>(this.url + '/Grupo9/Listcourses');
  }

  SRegistrarPubli(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/addpublication', objeto);
  }
  Seditar(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/updateUser', objeto);
  }
  
  
  SAsignar(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/addCurso', objeto);
  }

  SMycourse(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/MyCourses', objeto);
  }

  STotalCreditos(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/TotalCreditos', objeto);
  }

  getUsers(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/ListUser', objeto);
  }
  SComentario(objeto: any): Observable<any[]> {
    return this.http.post<any>(this.url + '/Grupo9/addcomment', objeto);
  }

}
