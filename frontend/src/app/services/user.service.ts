import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../shared/models/users';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USERS_LOGIN_URL } from '../shared/constants/urls';
import { tap } from 'rxjs';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<Users>(new Users());
  public  userObservable : Observable<Users> ;
  
  constructor(private http: HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable() ;
  } 

  login(userLogin:IUserLogin): Observable<Users> {
      return this.http.post<Users>(USERS_LOGIN_URL, userLogin).pipe(
          tap({
             next : (user) => {
                this.userSubject.next(user) ;
                this.toastrService.success(`Welcome on my smart restaurant ${user.username} !`, 'Login Succesful')
             },
             error : (errorResponse)=> {
                this.toastrService.error(errorResponse.error, 'Login Failed')
             }
              
          })
      );
  }
}
