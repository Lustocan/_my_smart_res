import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../shared/models/users';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USERS_LOGIN_URL, USERS_URL, USERS_SIGN_IN_URL, USER_URL } from '../shared/constants/urls';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUserSign_in } from '../shared/interfaces/IUserSign_in';
import { HttpOptions } from '../shared/models/httpOptions';
import { TOKEN } from '../shared/constants/Storage_name';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	httpOptions = new HttpOptions();
	constructor(private http: HttpClient ,private toastrService : ToastrService) {
	}


	
	//TODO da cambiare: eliminare 'User' dal localstorage e mantenere solo 'Token'
	login(userLogin: IUserLogin): Observable<Users> {
		return this.http.post<Users>(USERS_LOGIN_URL, userLogin, this.httpOptions).pipe(
			tap({
				next: (user) => {
					this.toastrService.success('Login in Successful' );
					this.setUserToLocalStorage(user);
				},
				error: (errorResponse) => {
					this.toastrService.error('Login in Failed');			
				}
			})
		);
	}

	sign_in(userLogin: IUserSign_in): Observable<Users> {
		return this.http.post<Users>(USERS_SIGN_IN_URL, userLogin, this.httpOptions).pipe(
			tap({
				next: (user) => { 
					this.toastrService.success('Sign in Successful');
				},
				error: (errorResponse) => {
					this.toastrService.error('Sign in Failed');
				}
			})
		);
	}

	logout(){
		this.deleteUserFromLocalStorage() ;
		window.location.reload();
	}

	private setUserToLocalStorage(user: Users) {
		localStorage.setItem(TOKEN, user.toString());
	}

	private deleteUserFromLocalStorage() {
		if(localStorage.getItem(TOKEN)) localStorage.removeItem(TOKEN) ;
	}


	getAll(): Observable<Users[]>{
		return this.http.get<Users[]>(USERS_URL,this.httpOptions);
	}

    getIt() : Observable<Users> { // changed USER_URL in USERS_URL
        let http = new HttpOptions();
        return this.http.get<Users>(USER_URL, http) ;
    }

	updateUser(id:String,username:String, name:String, surname: String, role: String) : Observable<Users> {
		return this.http.patch<Users>(USERS_URL+'/'+id,{username:username,name:name,surname:surname,role:role},this.httpOptions).pipe(
			tap({
				next: (user) => { 
					this.toastrService.success('Update Successful');
				},
				error: (errorResponse) => {
					this.toastrService.error(' Failed');
				}
			}));
	}

	deleteUser(id:string) : Observable<Users>{
		return this.http.delete<Users>(USERS_URL+'/'+id,this.httpOptions).pipe(
			tap({
				next: (user) => { 
					this.toastrService.success('Deleted Successfully');
				},
				error: (errorResponse) => {
					this.toastrService.error('Delete Failed');
				}
			}));
	}
}
