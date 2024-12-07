import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'modules',
        loadChildren:()=>import('./modules/modules.routes')
    },
    {
        path:'login',
        loadComponent:()=>import('./auth/login/login.component')
    }
];
