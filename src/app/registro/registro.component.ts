import { Component, OnInit } from '@angular/core';
import { UserDto } from "../models/user";
import { FormBuilder, FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { UserServiceService } from "../service/user-service.service";
import { Router } from '@angular/router';
import { ModalComponent} from "../commons/modal/modal.component";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user:UserDto = new UserDto();
  formulario: FormGroup;

  modalOptions:NgbModalOptions;
  closeResult: string;
  title = 'ng-bootstrap-modal-demo';


  constructor(
    private servicio : UserServiceService ,
    private formBuilder: FormBuilder,
    private router : Router) {
    
     }

  ngOnInit(): void {
      this.initializeForm();
  }
  
  initializeForm(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)] ],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      firstName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      lastName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
     valid : true
    });
  }

  registrar(){
    this.user.email= this.formulario.controls['email'].value;
    this.user.password = this.formulario.controls['password'].value;
    this.user.firstName = this.formulario.controls['firstName'].value;
    this.user.lastName = this.formulario.controls['lastName'].value;


     this.servicio.registrar(this.user).subscribe(
        (resp : UserDto) =>{
          this.router.navigateByUrl('home');
        }, error =>{
          console.error("error al intentar registrar usuario");
        }
      )
      
  }

  emailNoValido(){
    return this.formulario.get("email").invalid && this.formulario.get("email").touched
  }

  firstNameNoValido(){
    return this.formulario.get("firstName").invalid && this.formulario.get("firstName").touched
  }

  lastNameNoValido(){
    return this.formulario.get("lastName").invalid && this.formulario.get("lastName").touched
  }

  passwordNoValido(){
    return this.formulario.get("password").invalid && this.formulario.get("password").touched
  }

}
