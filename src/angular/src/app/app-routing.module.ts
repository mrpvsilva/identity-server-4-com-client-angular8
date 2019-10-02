import { AuthorizationGuard } from './guards/AuthorizationGuard ';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DefaultComponent } from './layouts/default/default.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'login',    
    component: LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
