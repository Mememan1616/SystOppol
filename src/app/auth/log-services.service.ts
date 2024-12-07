import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../modules/interfaces/usuarios';
@Injectable({
  providedIn: 'root'
})
export class LogServicesService {

  constructor( private http: HttpClient ) { }

  public validaUsuario(user:string, password:string){
    return this.http.get<Usuarios>('http://127.0.0.1:5000/validaUsuario/'+user+'/'+password)
  }

 

}
