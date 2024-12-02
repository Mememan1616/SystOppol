import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Municipios } from './interfaces/municipios';
import { Distritos } from './interfaces/distritos';
import { Secciones } from './interfaces/secciones';
import { Usuarios } from './interfaces/usuarios';


@Injectable({
  providedIn: 'root'
})
export class ModulesServicesService {

  constructor(private  http: HttpClient) { }

  public getMunicipios():Observable<Municipios[]>{
    return this.http.get<Municipios[]>('http://127.0.0.1:5000/municipios')
  }

  public getDistritos(id:number):Observable<Distritos[]>{
    return this.http.get<Distritos[]>('http://127.0.0.1:5000/buscardistritos/'+id)
  }

  public getSecciones(id1:number, id2:number):Observable<Secciones[]>{
    return this.http.get<Secciones[]>('http://127.0.0.1:5000/secciones/'+id1+'/'+id2)
  }

  public getUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>('http://127.0.0.1:5000/usuarios')
  }

  public añadirUsuario(datos:Usuarios){
    console.log('Datos enviados',datos)
    return this.http.post('http://127.0.0.1:5000/newusuario',datos)
  }



  
}
