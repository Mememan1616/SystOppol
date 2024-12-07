import { Component, OnInit } from '@angular/core';
import { LogServicesService } from '../log-services.service';
import { CommonModule } from '@angular/common';
import { RouterLink,Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Usuarios } from '../../modules/interfaces/usuarios';
import { AnimateTimings } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  dataSource:any=[]
  formGroup!: FormGroup;
  User:Usuarios={
    usuario:'',
    password:'',
    nombre:'',
    cargoID:0,
    cargo:'',
    estatus:1,
    idUsuario:0
  }

  constructor(private fb: FormBuilder ,public servicio:LogServicesService, private router:Router) { }

  ngOnInit(): void {
    this.formGroup=this.initForm();
  }

  initForm(){
    return this.fb.group({
      usuario:['', Validators.required],
      password:['', Validators.required],
    })
  }

  enviaForm():void{
    const{usuario,password}=this.formGroup.value
    this.User.usuario=usuario;
    this.User.password=password;
    //console.log(this.User);
    this.validacion()
  }

  validacion(){
    this.servicio.validaUsuario(this.User.usuario, this.User.password).subscribe({
      next:response=>{
        this.dataSource=response;
        console.log(this.dataSource);
   },
   error: error=>console.log(error)
  })
  }
}
