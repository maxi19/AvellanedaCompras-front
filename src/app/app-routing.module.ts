import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { UserGuardGuard } from './commons/user-guard.guard';

const routes: Routes = [
  { path: 'home', component: FormularioComponent,canActivate:[UserGuardGuard]  } ,
  { path: 'login', component: LoginComponent },
  { path: 'user/:id', component: EditComponent, canActivate:[UserGuardGuard] },
  { path:'',redirectTo:'login', pathMatch: 'full' },



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
