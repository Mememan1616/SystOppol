import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Municipios } from './interfaces/municipios';
import { Distritos } from './interfaces/distritos';
import { Secciones } from './interfaces/secciones';
import { Usuarios } from './interfaces/usuarios';
import { simpatizantes } from './interfaces/simpatizantes';
import { Colonias } from './interfaces/colonias';

@Injectable({
  providedIn: 'root'
})
export class ModulesServicesService {

  constructor(private  http: HttpClient) { }

  public getMunicipios():Observable<Municipios[]>{
    return this.http.get<Municipios[]>('http://127.0.0.1:5000/municipios')
  }

  public getColonias(cp:String):Observable<Colonias[]>{
    //console.log(cp)
    return this.http.get<Colonias[]>('http://127.0.0.1:5000/colonias/'+cp)
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
    //console.log('Datos enviados',datos)
    return this.http.post('http://127.0.0.1:5000/newusuario',datos)
  }
  
  public buscarUsuario(id:number){
    return this.http.get<Usuarios>('http://127.0.0.1:5000/buscar_usuario/'+id)
  }

  public borrarUsuario(id:number) {
    //console.log(`http://127.0.0.1:5000/eliminar_usuario/${id}`);
    return this.http.put(`http://127.0.0.1:5000/eliminar_usuario/`+id, {});
  }

  public modificarUsuario(id:number, datos:Usuarios){
    //console.log('http://127.0.0.1:5000/modificar_usuario/'+id,datos)
    return this.http.put('http://127.0.0.1:5000/modificar_usuario/'+id,datos)
  }

  public añadirSimpatizante(datos:simpatizantes){
    //console.log(datos)
    return this.http.post('http://127.0.0.1:5000/simpatizantes',datos)
  }
  
  public listarSimpatizantes():Observable<simpatizantes[]>{
    return this.http.get<simpatizantes[]>('http://127.0.0.1:5000/simpatizantes')
  }

  public buscarSimpatizantes(id:number):Observable<simpatizantes>{
    return this.http.get<simpatizantes>('http://127.0.0.1:5000/buscarSimpatizante/'+id)
  }
  public modificarSimpatizante(id:number,datos:simpatizantes){
    return this.http.put('http://127.0.0.1:5000//modificar_sp/'+id,datos)
  }

  public borrarSimpatizante(id:number) {
    //console.log(`http://127.0.0.1:5000/eliminar_usuario/${id}`);
    return this.http.put('http://127.0.0.1:5000/eliminar_sp/'+id, {});
  }
}
