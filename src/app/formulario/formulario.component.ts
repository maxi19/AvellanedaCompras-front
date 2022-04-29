import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserServiceService } from "../user-service.service";
import { User } from "./UserModel";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  users : User[] = [];
  userDetail : User = null;
  detailFields:boolean = false;
  empty:Boolean = false;

  loading:boolean= false;

  constructor( private servicio : UserServiceService) { }

  ngOnInit(): void {
    this.loading = true;
      this.loadUsers();
  }

  public loadUsers(){
    this.servicio.users()
    .subscribe(
      resp => this.users = resp
    ) ;
    this.loading = false;
  }

  public emptyUsers():boolean{
      if (this.users.length === 0 ) {
        return true;
      }
      return false;
  }

  public deleteUser(user : User, i : number):void{
    Swal.fire({
      title:"esta seguro",
      text : "esta seguro que desea borrar" ,
      showConfirmButton: true,
      showCancelButton : true
    }).then(
      resp => {
        if (resp.value) {
              this.users.splice(i, 1);
              this.servicio.deleteUser(user.id).subscribe(reso =>{
              })
        }
      }
    )
  }
}
