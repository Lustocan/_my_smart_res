import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../shared/models/users';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USERS_LOGIN_URL, USERS_SIGN_IN_URL } from '../shared/constants/urls';
import { tap } from 'rxjs';
import { Toast, ToastrService } from 'ngx-toastr';
import { IUserSign_in } from '../shared/interfaces/IUserSign_in';
import { HttpOptions } from '../shared/models/httpOptions';
import { TOKEN, USER_KEY } from '../shared/constants/Storage_name';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	private userSubject = new BehaviorSubject<Users>(this.getUserFromLocalStorage());
	public userObservable: Observable<Users>; // readonly version of userSubject

	constructor(private http: HttpClient, private toastrService: ToastrService) {
		this.userObservable = this.userSubject.asObservable();
	}


	
	//TODO da cambiare: eliminare 'User' dal localstorage e mantenere solo 'Token'
	login(userLogin: IUserLogin): Observable<Users> {
		let httpOptions = new HttpOptions();
		return this.http.post<Users>(USERS_LOGIN_URL, userLogin, httpOptions).pipe(
			tap({
				next: (user) => {
					this.setUserToLocalStorage(user);
					this.userSubject.next(user);
					this.toastrService.success(`Welcome to My smart restaurant ${user.username} !`, 'Login Successful');
				},
				error: (errorResponse) => {
					this.toastrService.error(errorResponse.error, 'Login Failed');
				}
			})
		);
	}

	sign_in(userLogin: IUserSign_in): Observable<Users> {
		let httpOptions = new HttpOptions ;
		return this.http.post<Users>(USERS_SIGN_IN_URL, userLogin, httpOptions).pipe(
			tap({
				next: (user) => { },
				error: (errorResponse) => {
					this.toastrService.error(errorResponse.error, 'Sign in Failed')
				}
			})
		);
	}

	logout(){
		this.deleteUserFromLocalStorage() ;
		window.location.reload();
	}

	private setUserToLocalStorage(user: Users) {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
		localStorage.setItem(TOKEN, user.toString());
	}

	private getUserFromLocalStorage(): Users {
		const userJson = localStorage.getItem(USER_KEY);
		if (userJson) return JSON.parse(userJson) as Users;
		return new Users;
	}

	private deleteUserFromLocalStorage() {
		if(localStorage.getItem(USER_KEY)) localStorage.removeItem(USER_KEY) ;
		if(localStorage.getItem(TOKEN)) localStorage.removeItem(TOKEN) ;
	}
}
