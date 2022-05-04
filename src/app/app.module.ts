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
import { RegistroComponent } from './registro/registro.component';
import { ModalComponent } from './commons/modal/modal.component';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    EditComponent,
    LoginComponent,
    RegistroComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgbModule
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
