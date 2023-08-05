import { Injectable } from '@angular/core';
import { Users } from '../shared/models/users'
import { Observable } from 'rxjs';
import { USERS_URL } from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class usersService {

    constructor(private http : HttpClient) {} 

    getAll() : Observable<Users[]>   {
        return this.http.get<Users[]>(USERS_URL) ;
    }
   /* getAllUsersBySearchTerm(searchTerm : string){
        return this.http.get<Users[]>()
    }*/

}
