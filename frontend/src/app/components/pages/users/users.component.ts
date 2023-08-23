import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/shared/models/users';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent {

	user: Users = new Users();
	users: Users[] = [];

	current_date = new Date(); 

	constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) {
		userService.getAll().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					this.toastrService.error('You must log first');
					this.router.navigateByUrl('/login');
				}
				return new Observable<Users[]>();

			})).subscribe((serverUsers) => this.users = serverUsers);


		userService.getIt().subscribe((serverUser) => this.user = serverUser);
	}

	submitDelete(id: string) {
		this.userService.deleteUser(id).subscribe(() => {
			location.reload();
		});


	}

	myUser(id: string) : boolean{
		return this.user._id === id;
	}

}
