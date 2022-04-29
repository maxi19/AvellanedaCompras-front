import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable, observable } from "rxjs";
import {  ActivatedRoute } from "@angular/router";
import { User } from "../formulario/UserModel";
import {  map } from "rxjs/operators";
import { UserServiceService } from "../user-service.service";
import Swall from "sweetalert2";
import { FormBuilder, FormGroup, FormControl, Validators, NgModel } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user:User = new User();

  formulario: FormGroup;

  isEditable : boolean = false;

  titulo : String ="Nuevo usuario"

  constructor(private router : ActivatedRoute , private service : UserServiceService , private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
      const id =  this.router.snapshot.paramMap.get('id');
      if (id !== 'nuevo') {
        this.titulo = "Edicion datos de usuario";
        this.isEditable = true;
        this.setValueToForm(id);
      }
  }

  public setValueToForm(id : String){
    this.service.getUser(id).subscribe(
      (resp : User) =>{
        this.user = resp;
        this.user.id = id;
        this.formulario.setValue({
          id : this.user.id,
          name : this.user.name,
          username: this.user.username,
          email : this.user.email,
        })
      });      
  }

  public deleteUser(){

  }

  public createRequest(){

    this.getValuesFromForm();
      
      Swall.fire({
        title: "guardadando informacion",
        text: "guardando informacion",
        allowOutsideClick : false
      });
      Swall.showLoading();

      let peticion : Observable<any>;
      if(this.user.id === "" ){
          peticion = this.service.createUser(this.user); 
      } else{
          peticion = this.service.updateUser(this.user);
      }

      peticion.subscribe(
        resp => {
            Swall.fire({
              title : this.user.username,
              text : "se actualizo corectamente"
            })
        }
      )

      this.initializeForm();

    }
  
    getValuesFromForm():void{
      this.user.id= this.formulario.controls['id'].value;
      this.user.name = this.formulario.controls['name'].value;
      this.user.username = this.formulario.controls['username'].value;
      this.user.email=this.formulario.controls['email'].value;
    }

    initializeForm(): void {
    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      username: ['', [Validators.pattern('^[0-9]*$'), Validators.required, Validators.minLength(6), Validators.maxLength(17)]],
      email: ['', [Validators.minLength(10), Validators.required]]
    });
  }

  

  public next(){

  }

  public previous(){

  }
}
