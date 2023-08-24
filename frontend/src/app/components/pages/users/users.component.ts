import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class UsersComponent implements OnInit {

	users: Users[] = [];

	constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { }

	ngOnInit(){
		this.getUsers() ;
	}

	submitDelete(id: string) {
		this.userService.deleteUser(id).subscribe(() => {
			location.reload();
		});
	}

	getUsers(){
		this.userService.getAll().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					this.toastrService.error('Login required');
					this.router.navigateByUrl('/login');
				}
				return new Observable<Users[]>();

			})).subscribe((serverUsers) => this.users = serverUsers);
	}
}
