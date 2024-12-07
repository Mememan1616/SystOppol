import { Component } from '@angular/core';
import { ModulesServicesService } from '../../modules-services.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-simpatizantes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './ver-simpatizantes.component.html',
  styleUrl: './ver-simpatizantes.component.css'
})
export default class VerSimpatizantesComponent {
  simpa:any=[]
  constructor(public servicio:ModulesServicesService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.servicio.listarSimpatizantes().subscribe(
      {
        next: response =>{
          this.simpa=response
          console.log(this.simpa)
        },
        error:error=>console.log(error)        
      }
    ); 
  }
}
