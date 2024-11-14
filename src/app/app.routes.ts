import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'modules',
        loadChildren:()=>import('./modules/modules.routes')
    }
];
