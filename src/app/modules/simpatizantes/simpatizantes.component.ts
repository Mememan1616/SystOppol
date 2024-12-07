import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Municipios } from '../interfaces/municipios';
import { ModulesServicesService } from '../modules-services.service';
import { RouterLink,Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { simpatizantes } from '../interfaces/simpatizantes';


@Component({
  selector: 'app-simpatizantes',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule,RouterLink],
  templateUrl: './simpatizantes.component.html',
  styleUrl: './simpatizantes.component.css'
})

export default class SimpatizantesComponent implements OnInit {
 
  constructor(public servicios:ModulesServicesService, private fb: FormBuilder, private router:Router){}
  dataSource:any=[];
  imageBase64: string | null = null;
  imageBase642: string | null = null;
  Distritos:any=[];
  Colonias:any=[];
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
    fcredencial:"",
    bcredencial: ""
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
        //console.log(this.Usuarios)
  
      },
      error: error=>console.log(error)
    });

  }

  initForm():FormGroup{
    return this.fb.group({
      apellidoP:['', Validators.required],
      apellidoM:['', Validators.required],
      nombre:['',Validators.required],
      fechaNac:['',Validators.required],
      telefono:['',Validators.required],
      correo:['',Validators.required],
      municipio:['', Validators.required],
      distrito:['', Validators.required],
      seccion:['',Validators.required],
      codigoP:['',Validators.required],
      colonia:['',Validators.required],
      direccion:['',Validators.required],
      vinculacion:['',Validators.required],
      liderazgo:['',Validators.required],
      fcredencial:['',Validators.required],
      bcredencial:['', Validators.required]
    })
   }

   // Método que se ejecuta al seleccionar un archivo
  onFileChange1(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Obtener el archivo seleccionado
      const reader = new FileReader();

      // Evento que se ejecuta cuando el archivo ha sido leído
      reader.onload = () => {
        const base64String = reader.result as string; // Contiene el archivo en base64
        this.imageBase64 = base64String.split(',')[1]; // Remover encabezado "data:image/jpeg;base64,"
        this.simpatizante.fcredencial=this.imageBase64
        //console.log('Base64:', this.imageBase64); // Mostrar el resultado en la consola
      };
      // Leer el archivo como DataURL (Base64)
      reader.readAsDataURL(file);
    }
  }
/*
  onFileChange2(event: any) {
    const file = event.target.files[0];  // Obtener el primer archivo seleccionado
    if (file) {
      //console.log(file);
      const controlName = event.target.name;  // Esto te da el nombre del control
        //this.simpatizante.fcredencial = file;
        this.simpatizante.bcredencial = file;
      
    }
  }¨*/

  onFileChange2(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Obtener el archivo seleccionado
      const reader = new FileReader();

      // Evento que se ejecuta cuando el archivo ha sido leído
      reader.onload = () => {
        const base64String = reader.result as string; // Contiene el archivo en base64
        this.imageBase642 = base64String.split(',')[1]; // Remover encabezado "data:image/jpeg;base64,"
        this.simpatizante.bcredencial=this.imageBase642
        //console.log('Base64:', this.imageBase642); // Mostrar el resultado en la consola
      };
      // Leer el archivo como DataURL (Base64)
      reader.readAsDataURL(file);
    }
  }

  submitData(){
    this.servicios.añadirSimpatizante(this.simpatizante).subscribe({
      next:()=>console.log(),
      
      complete:()=>console.info()})
      //console.log(this.simpatizante)
    this.simpatizante={
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
      fcredencial:"",
      bcredencial: ""
     
    }
    //this.router.navigate(['modules/usuarios'])
    alert('Simpatizante agregado exitosamente.');
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
    //console.log(this.simpatizante)
    this.submitData()
    this.router.navigate(['modules/usuarios'])
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
        //console.log(this.Secciones)
      },
      error: error => console.log(error)
    }
      );
  }
  
  colonias():void{
    const{codigoP}=this.formGroup.value
    let cp=codigoP;
    this.servicios.getColonias(cp).subscribe({
    
      next: response=>{
        this.Colonias=response;
        console.log(this.Colonias)
      },
      error: error => console.log(error)

    })
  }

}
