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
	users: Users[] = [];

	isCasher: boolean = false;
	constructor(private userService: UserService, private toastrService: ToastrService, private router: Router) {
		let userObservable: Observable<Users>;

		userObservable = userService.getIt().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					this.toastrService.error('You must log first');
					this.router.navigateByUrl('/login');
				}
				return new Observable<Users>();

			}));

		userObservable.subscribe((serverUser) => {
			this.user = serverUser
		});
	}


	ngOnInit(): void {
	}
}
