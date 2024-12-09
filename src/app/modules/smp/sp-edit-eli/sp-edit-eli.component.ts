import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { simpatizantes } from '../../interfaces/simpatizantes';
import { RouterLink,Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModulesServicesService } from '../../modules-services.service';
import { CommonModule , Location} from '@angular/common';

@Component({
  selector: 'app-sp-edit-eli',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sp-edit-eli.component.html',
  styleUrl: './sp-edit-eli.component.css'
})
export default class SpEditEliComponent {
  dataSource:any=[];
  formGroup!: FormGroup;
  Municipios:any=[];
  tem:any;
  Distritos:any=[];
  Colonias:any=[];
  Secciones:any=[];
  Usuarios:any=[];
  selectedMunicipio:number=0;

  constructor(private fb:FormBuilder, public service:ModulesServicesService, private router:Router, private location:Location){}
  imageWidth='300px';
  imageHeight='200px';
  setImageSize() {
    this.imageWidth = '300px'; // Ejemplo: cambiar el tamaño dinámicamente
    this.imageHeight = '200px'; 
  }

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

  ngOnInit(){
    this.formGroup=this.initForm();
    this.tem = this.location.path().split('/')
    console.log("componente "+this.tem[3])
    
    this.service.buscarSimpatizantes(parseInt(this.tem[3])).subscribe(
      {
        next:response=>{
          this.dataSource=response;
          //console.log(this.dataSource)
          //this.asignaCampos(this.dataSource)
          //console.log("Longitud de la cadena Base64 para fcredencial:", this.dataSource?.fcredencial?.length);
          //console.log("Longitud de la cadena Base64 para bcredencial:", this.dataSource?.bcredencial?.length);
          if (this.dataSource?.fcredencial) {
            // Elimina el prefijo 'b' y las comillas del comienzo y final de la cadena
            this.dataSource.fcredencial = this.dataSource.fcredencial.replace(/^b'|['"]$/g, '');
          }
      
          if (this.dataSource?.bcredencial) {
            // Elimina el prefijo 'b' y las comillas del comienzo y final de la cadena
            this.dataSource.bcredencial = this.dataSource.bcredencial.replace(/^b'|['"]$/g, '');
          }
          this.distritos(this.dataSource.municipio)
          this.secciones(this.dataSource.distrito, this.dataSource.municipio)
          this.colonias(this.dataSource.cp)

          if(this.dataSource.vinculacion=="Militante"){
            this.dataSource.vinculacion=1
          }
          else if(this.dataSource.vinculacion=="Simpatizante"){
            this.dataSource.vinculacion=2
          }
          else if(this.dataSource.vinculacion=="Ninguno"){
            this.dataSource.vinculacion=3
          }
          // Supongamos que 'fecha' es el valor que recibiste de la base de datos
          this.asignaCampos(this.dataSource)
        },
        error: error=>console.log(error)
      }
    );
    this.service.getMunicipios().subscribe(
      {
        next: response=>{

      this.Municipios=response;
      //console.log(this.Municipios)

    },
    error: error=>console.log(error)
  }
    );

    this.service.getUsuarios().subscribe({
      next: response=>{

        this.Usuarios=response;
        //console.log(this.Usuarios)
  
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
      municipio:['',],
      distrito:['',],
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

   asignaCampos(dataSource:any){
    const fecha = new Date(this.dataSource.fechaNac);

// Formatea la fecha como 'yyyy-MM-dd'
    const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
    this.formGroup.patchValue({
      apellidoP: dataSource.apellidoP || '',
      apellidoM:dataSource.apellidoM,
      nombre:dataSource.nombre,
      fechaNac:fechaFormateada,
      telefono:dataSource.telefono,
      correo:dataSource.correo,
      municipio:dataSource.municipio,
      distrito:dataSource.distrito,
      seccion:dataSource.seccion,
      codigoP:dataSource.cp,
      colonia:dataSource.colonia,
      direccion:dataSource.direccion,
      vinculacion:dataSource.vinculacion,
      liderazgo:dataSource.lid,
      
    });
   }
    updateSimpatizantes(){
      this.service.modificarSimpatizante(this.tem[3], this.simpatizante).subscribe({
        next:()=>console.log(),
        error:(e)=> console.error(e),
        complete:()=>console.info()
        })
        alert('Simpatizante modificado exitosamente.');
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
    this.updateSimpatizantes()
    //this.router.navigate(['modules/usuarios'])
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
    this.service.getDistritos(id).subscribe(
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
    this.service.getSecciones(id1,id2).subscribe(
      {
      next: response=>{
        this.Secciones=response;
        //console.log(this.Secciones)
      },
      error: error => console.log(error)
    }
      );
  }
  
  colonias(cp:string):void{
   
    this.service.getColonias(cp).subscribe({
    
      next: response=>{
        this.Colonias=response;
        console.log(this.Colonias)
      },
      error: error => console.log(error)

    })
  }
  getCol():void{
    const{codigoP}=this.formGroup.value
    let cp=codigoP;
    this.colonias(cp)
  }

  borraSp() {
    //const url = `http://127.0.0.1:5000/eliminar_usuario/${this.dataSource.idUsuario}`;
    //console.log('URL generada:', url);
    this.service.borrarSimpatizante(this.dataSource.idSimpatizante).subscribe({
      next: (response) => {
        //console.log('Respuesta del servidor:', response);
        alert('Simpatizante eliminado exitosamente.');
      },
      error: (err) => {
        console.error('Error al eliminar el usuario:', err);
      },
    });
    this.router.navigate(['modules/listarSimpatizantes'])
  }



}
