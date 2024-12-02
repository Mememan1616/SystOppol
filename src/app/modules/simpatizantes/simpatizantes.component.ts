import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Municipios } from '../interfaces/municipios';
import { ModulesServicesService } from '../modules-services.service';
import { RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-simpatizantes',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './simpatizantes.component.html',
  styleUrl: './simpatizantes.component.css'
})

export default class SimpatizantesComponent implements OnInit {
 
  constructor(public servicios:ModulesServicesService, private fb: FormBuilder){}
  dataSource:any=[];
  Distritos:any=[];
  Secciones:any=[];
  formGroup!:FormGroup;
  selectedMunicipio:number=0;
  ngOnInit(): void {
    this.formGroup=this.initForm();
    this.servicios.getMunicipios().subscribe(
      {
        next: response=>{

      this.dataSource=response;
      console.log(this.dataSource)

    },
    error: error=>console.log(error)
  }
    );

  }

  initForm():FormGroup{
    return this.fb.group({
      apellidoP:[''],
      apellidoM:[''],
      nombre:[''],
      fechaNac:[''],
      telefono:[''],
      correo:[''],
      municipio:[''],
      distrito:[''],
      seccion:[''],
      codigoP:[''],
      direccion:[''],
      vinculacion:[''],
      fcredencial:[''],
      bcredencial:['']
    })
   }

   getMunicipio():void{
    const{municipio}=this.formGroup.value
    let id=Number(municipio)
    //console.log(municipio)
    this.distritos(id)
   }

   getMunDist():void{
    const{municipio,distrito}=this.formGroup.value
    let id2=Number(municipio)
    let id1=Number(distrito)
    //console.log(distrito+"/"+municipio)
    this.secciones(id1,id2)
    
   }
  

  distritos(id:number):void{
    this.servicios.getDistritos(id).subscribe(
      {
      next: response=>{
        this.Distritos=response;
        //console.log(this.Distritos)
      },
      error: error => console.log(error)
    }
      );
  }

  secciones(id1:number, id2:number):void{
    this.servicios.getSecciones(id1,id2).subscribe(
      {
      next: response=>{
        this.Secciones=response;
        console.log(this.Secciones)
      },
      error: error => console.log(error)
    }
      );
  }

  
 
  

}
