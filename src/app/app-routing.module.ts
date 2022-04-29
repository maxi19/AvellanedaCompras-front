import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: FormularioComponent } ,
  {  path: 'user/:id', component: EditComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
