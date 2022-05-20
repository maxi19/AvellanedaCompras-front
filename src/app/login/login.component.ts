import { Component, OnInit } from '@angular/core';
import { User } from '../models/UserModel';
import { UserServiceService } from "../service/user-service.service";
import { FormBuilder, FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from "../models/Auth";
import { Respuesta } from "../models/Respuesta";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  formulario: FormGroup;
  mostrarVentanaWarning:boolean = false;
  mensajeError:string="Error con el usuario contraseña";

  
  constructor(private servicio : UserServiceService , private formBuilder: FormBuilder, private router : Router  ) { }

  ngOnInit(): void {
      this.initializeForm();
  }
  
  initializeForm(): void {
    this.formulario = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)] ],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  login(){
    this.user.username= this.formulario.controls['username'].value;
    this.user.password = this.formulario.controls['password'].value;

      this.servicio.login(this.user).subscribe(
        (resp : Auth) =>{
          localStorage.setItem("token",resp.token);
          this.router.navigateByUrl('home');
        },(error)=> {
            this.mostrarVentanaWarning = true;
             this.formulario.controls['username'].setValue("");
             this.formulario.controls['password'].setValue("");
        }
        
      )
      
  }




}
