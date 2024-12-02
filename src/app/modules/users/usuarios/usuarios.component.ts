import { Component } from '@angular/core';
import { ModulesServicesService } from '../../modules-services.service';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export default class UsuariosComponent {
  users:any=[]
  constructor(public usuarios:ModulesServicesService){}


  ngOnInit(): void {
    this.usuarios.getUsuarios().subscribe(
      {
        next: response=>{

      this.users=response;
      //console.log(this.users)

    },
    error: error=>console.log(error)
  }
    );

  }

}
