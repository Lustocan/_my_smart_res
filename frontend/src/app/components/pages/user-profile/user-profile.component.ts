import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/shared/models/users';
import { Observable, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	
	user = new Users();

	constructor(private userService: UserService, private toastrService: ToastrService, 
		        private router: Router) { }

	ngOnInit(): void {
		this.initUser() ;
	}

	initUser(){
		this.userService.getIt().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					if(error.status===400){
						this.toastrService.error('Login required');
						this.router.navigateByUrl('/login');
					}
					else if(error.status===403){
						this.toastrService.error('Unauthorized');
						this.router.navigateByUrl('/');
					}
				}
				return new Observable<Users>()})
		).subscribe((serverUser) => {
			this.user = serverUser
		});
	}
}
