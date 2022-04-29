import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';

import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from "../app/user-service.service";
import { CommonModule } from "@angular/common";
import { EditComponent } from './edit/edit.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule ,FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
