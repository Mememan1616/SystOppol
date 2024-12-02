import { Component, OnInit } from '@angular/core';
import { ModulesServicesService } from '../modules-services.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Usuarios } from '../interfaces/usuarios';


@Component({
  selector: 'app-form-usurio',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-usurio.component.html',
  styleUrl: './form-usurio.component.css'
})
export default class  FormUsurioComponent implements OnInit {
  formGroup!: FormGroup;

  newUser:Usuarios={
    usuario:'',
    password:'',
    nombre:'',
    cargoID:0,
    cargo:'',
    estatus:1,
    idUsuario:0
  }

  constructor(private fb: FormBuilder ,public usuarios:ModulesServicesService, private router:Router) { }

  ngOnInit(): void {
    this.formGroup=this.initForm();
  }

  initForm(){
    return this.fb.group({
      usuario:[''],
      password:[''],
      nombre:[''],
      cargo:[''],
    })
    

  }

  insertarUsuario(){
    this.usuarios.añadirUsuario(this.newUser).subscribe({
      next:()=>console.log(),
      complete:()=>console.info()})


    this.newUser={
      idUsuario:0,
      usuario:'',
      password:'',
      cargo:'',
      cargoID:0,
      estatus:1,
      nombre:''
    }
    this.router.navigate(['modules/usuarios'])
  }

  nuevoUsuario():void{
    const{usuario, password, nombre, cargo }=this.formGroup.value;
    this.newUser.nombre=nombre;
    this.newUser.usuario=usuario;
    this.newUser.password=password;
    if (Number(cargo)==1){
      this.newUser.cargo="Administrador";
    } else if (Number(cargo)==3){
      this.newUser.cargo="Encuestador";
    }else if (Number(cargo)==2){
      this.newUser.cargo="Lider";
    }
    this.newUser.cargoID=Number(cargo);
    //console.log(this.newUser)
    this.insertarUsuario()
  }
}