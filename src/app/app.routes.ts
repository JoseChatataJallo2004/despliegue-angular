import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './acceso/login/login.component';
import { NoEncontradoComponent } from './acceso/no-encontrado/no-encontrado.component';
import { RegisterComponent } from './acceso/register/register.component';
import { AuthGuard } from './acceso/seguridad/auth.guard';

export const routes: Routes = [
    {
        path: 'menu',
        canActivate: [AuthGuard],
        loadComponent: () => import('./menu/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
            },
            {
                path:'productos',
                loadComponent:()=>import('./pages/producto/producto.component').then(m=>m.ProductoComponent),
            },
            {
                path:'productos/create',
                loadComponent:()=>import('./pages/producto-create/producto-create.component').then(m=>m.ProductoCreateComponent),
            },
            {
                path: 'productos/edit/:id',
                loadComponent: () => import('./pages/producto-edit/producto-edit.component').then(m => m.ProductoEditComponent),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '', component: LoginComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'registrar', component: RegisterComponent
    },
    {
        path: '**',
        component: NoEncontradoComponent
        // redirectTo:'',        
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
