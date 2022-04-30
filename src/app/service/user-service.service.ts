import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import {  User } from '../models/UserModel';
import { map , delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Auth } from '../models/Auth';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private  URL_RESOURCE = "https://usuarios-b0d9d-default-rtdb.firebaseio.com";

  constructor(private http: HttpClient) { 
  }

  users(){
    return this.http.get(this.URL_RESOURCE+"/users.json")
    .pipe(
      map(this.crearArreglo)
    );
  }

  getUser(id: String) {
    return this.http.get<User>(`${this.URL_RESOURCE}/users/${id}.json`);
  }

  createUser( user : User){
    return this.http.post(`${this.URL_RESOURCE}/users.json`, user)
    .pipe(
      map( (resp:any) => {
            user.id = resp.name
            return user;
        }
      ),
      delay(1500)
    )
  }

  deleteUser(id: String){
    return this.http.delete<User>(`${this.URL_RESOURCE}/users/${id}.json`);
  }
  
  updateUser( user : User){
    const userTemp ={
      ...user
    }
    delete userTemp.id;
    return this.http.put(`${this.URL_RESOURCE}/users/${user.id}.json`, userTemp   )
  }


  private crearArreglo(userObj : object){
    const users : User[] = [];
    if (userObj !== null) {
      Object.keys(userObj).forEach(key => {
        const user : User = userObj[key];
        user.id = key; 
        users.push(user);
      });
    }
    return users;
  }


  login( user : User) : Observable<any> {
    return this.http.post(`${environment.url}/authenticate`, user)
    .pipe(
      map( (resp:Auth) => {
         return resp;
        }
      ),
      delay(1500)
    )
  }

}
