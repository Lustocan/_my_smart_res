// definition of user object

export class Users{
    constructor(_id?:string, username?:string, name?:string, surname?:string, role?:string, password?:string ){
        this._id = _id === undefined ? "" : _id;
        this.username = username === undefined ? "" : username;
        this.name = name === undefined ? "" : name;
        this.role = role === undefined ? "" : role;
        this.password = password === undefined ? "" : password;
    }
    _id !           : string ;
    username!       : string ;
    name?           : string ;
    surname?        : string ;
    role!           : string ;
    password!       : string ;
}