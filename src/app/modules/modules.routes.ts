import { Routes } from '@angular/router';

export default [

    {
        path: 'usuarios',
        loadComponent: () =>import('./users/usuarios/usuarios.component')
    },

    {
        path:'simpatizantes',
        loadComponent:()=> import('./simpatizantes/simpatizantes.component')
    },
    {
        path:'registrar_usuario',
        loadComponent:()=> import('./users/form-usurio/form-usurio.component')
    },
    {
        path:'modificar_usuario/:id',
        loadComponent:()=> import('./users/mod-usuarios/mod-usuarios.component')
    },
    {
        path:'eliminar_usuario/:id',
        loadComponent:()=> import('./users/del-usuarios/del-usuarios.component')
    },
    {
        path:'listarSimpatizantes',
        loadComponent:()=> import('./smp/ver-simpatizantes/ver-simpatizantes.component')
    },
    {
        path:'editarSimpatizantes/:id',
        loadComponent:()=> import('./smp/sp-edit-eli/sp-edit-eli.component')
    }   
    


] as Routes