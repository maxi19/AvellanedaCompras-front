/*
export interface IUser{
    id: String;
    name: String;
    username: String;
    email: String;
}


  export class User implements IUser{

    static UserFromJson(obj: Object){
        return new User(
            obj['id'],
            obj['name'],
            obj['username'],
            obj['email'],
        )
    }


    constructor(public id, public name, public username, public email){

    }
}
*/

export class User {
    id: String;
    name: String;
    username: String;
    email: String;
    password: String;
}