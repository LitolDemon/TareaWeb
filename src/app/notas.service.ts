import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs";
import {Nota} from "./inicio/nota";

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  url="http://localhost/TareaWeb/backend/";
  constructor(private http:HttpClient) { }

  cargar():Observable<any>{
    return this.http.get(`${this.url}inicio.php`);
  }

  guardar(lista:Array<Nota>):Observable<any>{
    return this.http.post(`${this.url}guardar.php`, JSON.stringify(lista));
  }

  actulizar(lista:Array<Nota>):Observable<any>{
    return this.http.post(`${this.url}actualizar.php`, JSON.stringify(lista));
  }

  eliminar(lista:Array<Nota>):Observable<any>{
    return this.http.post(`${this.url}elimiar.php`, JSON.stringify(lista));
  }

  
}