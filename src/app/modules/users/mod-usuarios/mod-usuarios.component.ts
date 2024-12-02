import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuarios } from '../../interfaces/usuarios';
import { RouterLink,Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModulesServicesService } from '../../modules-services.service';
import { CommonModule , Location} from '@angular/common';

@Component({
  selector: 'app-mod-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './mod-usuarios.component.html',
  styleUrl: './mod-usuarios.component.css'
})


export default class  ModUsuariosComponent {
  dataSource:any=[];
  formGroup!: FormGroup;
  tem:any;

  user:Usuarios={
    idUsuario:0,
    usuario:'',
    password:'',
    nombre:'',
    cargoID:0,
    cargo:'',
    estatus:1
  }

  constructor(private fb:FormBuilder, public service:ModulesServicesService, private router:Router, private location:Location){}

  

  
  ngOnInit(){
    this.formGroup=this.initForm();
    this.tem = this.location.path().split('/')
    console.log("componente "+this.tem[3])
    //console.log('holaaaaa')
    this.service.buscarUsuario(parseInt(this.tem[3])).subscribe(
      {
        next:response=>{
          this.dataSource=response;
          //console.log(this.dataSource)
          this.asignaCampos(this.dataSource)
        },
        error: error=>console.log(error)
      }
    );
  }


  initForm():FormGroup{
    return this.fb.group({
      usuario:[''],
      password:[''],
      nombre:[''],
      cargo:[''],
  })

  }

  asignaCampos(dataSource:any){
    
    this.formGroup.patchValue({
      usuario: dataSource.usuario || '', // Si la propiedad se llama diferente, ajusta aquí
      password: dataSource.password || '',
      nombre: dataSource.nombre || '',
      cargo: dataSource.cargoID || ''
    });
  
    //console.log("Formulario actualizado:", this.formGroup.value);

  }



  modificaUsuarios(){
    const{usuario, password, nombre, cargo}=this.formGroup.value
    this.user.nombre=nombre;
    this.user.usuario=usuario;
    this.user.password=password;
    if (Number(cargo)==1){
      this.user.cargo="Administrador";
    } else if (Number(cargo)==3){
      this.user.cargo="Encuestador";
    }else if (Number(cargo)==2){
      this.user.cargo="Lider";
    }
    this.user.cargoID=Number(cargo);
    console.log(this.user)
  }

}
