import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import {PostDialogComponent} from './post-dialog/post-dialog.component';
import{ RegisterComponent} from './register/register.component';
import{ LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'addPost',
    component:PostDialogComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
