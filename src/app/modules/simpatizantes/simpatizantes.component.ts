import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Municipios } from '../interfaces/municipios';
import { ModulesServicesService } from '../modules-services.service';
import { RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { simpatizantes } from '../interfaces/simpatizantes';


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
  imagen1:any;
  imagen2:any;
  Distritos:any=[];
  Secciones:any=[];
  Usuarios:any=[];
  formGroup!:FormGroup;
  selectedMunicipio:number=0;

  simpatizante:simpatizantes={
    apellidoP:"",
    apellidoM:"",
    nombre:"",
    fechaN:"",
    telefono:"",
    correo:"",
    municipio:0,
    distrito:0,
    seccion:0,
    colonia:0,
    codigoP:"",
    direccion:"",
    vinculacion:"",
    liderazgo:0,
    fcredencial: new File([], '') ,
    bcredencial: new File([], '')
  }
  
  ngOnInit(): void {
    this.formGroup=this.initForm();
    this.servicios.getMunicipios().subscribe(
      {
        next: response=>{

      this.dataSource=response;
      //console.log(this.dataSource)

    },
    error: error=>console.log(error)
  }
    );

    this.servicios.getUsuarios().subscribe({
      next: response=>{

        this.Usuarios=response;
        console.log(this.Usuarios)
  
      },
      error: error=>console.log(error)
    });

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
      colonia:[''],
      direccion:[''],
      vinculacion:[''],
      liderazgo:[''],
      fcredencial:[''],
      bcredencial:['']
    })
   }

   onFileChange1(event: any) {
    const file = event.target.files[0];  // Obtener el primer archivo seleccionado
    if (file) {
      //console.log(file);
      const controlName = event.target.name;  // Esto te da el nombre del control
        this.simpatizante.fcredencial = file;
        //this.simpatizante.bcredencial = file;
      
    }
  }

  onFileChange2(event: any) {
    const file = event.target.files[0];  // Obtener el primer archivo seleccionado
    if (file) {
      //console.log(file);
      const controlName = event.target.name;  // Esto te da el nombre del control
        //this.simpatizante.fcredencial = file;
        this.simpatizante.bcredencial = file;
      
    }
  }

  

  tomarDatos(){
    const{apellidoP,apellidoM,nombre,fechaNac,telefono,correo, municipio, distrito, seccion, codigoP, colonia,direccion,vinculacion,liderazgo,fcredencial,bcredencial}=this.formGroup.value

    this.simpatizante.apellidoP=apellidoP;
    this.simpatizante.apellidoM=apellidoM;
    this.simpatizante.nombre=nombre;
    this.simpatizante.fechaN=fechaNac;
    this.simpatizante.telefono=telefono;
    this.simpatizante.correo=correo;
    this.simpatizante.municipio=Number(municipio);
    this.simpatizante.distrito=Number(distrito);
    this.simpatizante.seccion=Number(seccion);
    this.simpatizante.codigoP=codigoP;
    this.simpatizante.colonia=Number(colonia);
    this.simpatizante.direccion=direccion;
    if(Number(vinculacion)==1){
      this.simpatizante.vinculacion="Militante"
    }else if(Number(vinculacion)==2){
      this.simpatizante.vinculacion="Simpatizante"
    }else if (Number(vinculacion)==3){
      this.simpatizante.vinculacion="Ninguno"
    }
    this.simpatizante.liderazgo=Number(liderazgo)
    console.log(this.simpatizante)
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
