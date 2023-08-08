import { Injectable } from '@angular/core';
import { Users } from '../shared/models/users'
import { Observable, catchError } from 'rxjs';
import { USERS_URL } from '../shared/constants/urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { HttpOptions } from '../shared/models/httpOptions';


@Injectable({
  providedIn: 'root'
})
export class usersService {

    constructor(private http : HttpClient) {
    } 

    getAll() : Observable<Users[]>   {
        
        let httpOptions = new HttpOptions();
        return this.http.get<Users[]>(USERS_URL,httpOptions);
    }
   /* getAllUsersBySearchTerm(searchTerm : string){
        return this.http.get<Users[]>()
    }*/

}
