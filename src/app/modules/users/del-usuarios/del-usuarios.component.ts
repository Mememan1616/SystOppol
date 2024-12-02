import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Usuarios } from '../../interfaces/usuarios';
import { ModulesServicesService } from '../../modules-services.service';
import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-del-usuarios',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink ],
  templateUrl: './del-usuarios.component.html',
  styleUrl: './del-usuarios.component.css'
})
export default class DelUsuariosComponent {
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

  borraUsuario() {
    //const url = `http://127.0.0.1:5000/eliminar_usuario/${this.dataSource.idUsuario}`;
    //console.log('URL generada:', url);
    this.service.borrarUsuario(this.dataSource.idUsuario).subscribe({
      next: (response) => {
        //console.log('Respuesta del servidor:', response);
        alert('Usuario eliminado exitosamente.');
      },
      error: (err) => {
        console.error('Error al eliminar el usuario:', err);
      },
    });
    this.router.navigate(['modules/usuarios'])
  }
}
