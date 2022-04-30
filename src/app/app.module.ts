import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserServiceService } from "./service/user-service.service";
import { CommonModule } from "@angular/common";
import { EditComponent } from './edit/edit.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule ,FormsModule} from "@angular/forms";
import { AuthInterceptor } from "./commons/AuthInterceptor ";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    EditComponent,
    LoginComponent
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
    UserServiceService,
    {
    provide : HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
