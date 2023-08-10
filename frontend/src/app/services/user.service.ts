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

const USER_KEY = 'User';
@Injectable({
	providedIn: 'root'
})
export class UserService {

	private userSubject = new BehaviorSubject<Users>(this.getUSerFromLocalStorage());
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
	//non cancellare il commento
	private setUserToLocalStorage(user: Users) {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
		localStorage.setItem('Token', user.toString());
	}

	private getUSerFromLocalStorage(): Users {
		const userJson = localStorage.getItem(USER_KEY);
		if (userJson) return JSON.parse(userJson) as Users;
		return new Users;
	}
}
