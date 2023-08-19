import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

	constructor(private userService: UserService, private router: Router) {
		userService.getAll().subscribe((serverUsers) => this.users = serverUsers);
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
