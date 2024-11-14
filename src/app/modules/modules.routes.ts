import { Routes } from '@angular/router';

export default [

    {
        path: 'usuarios',
        loadComponent: () =>import('./usuarios/usuarios.component')
    }

] as Routes