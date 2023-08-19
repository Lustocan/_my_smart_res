import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/users'
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Table } from 'src/app/shared/models/table';
import { Socket } from 'socket.io-client';
import { SocketIoService } from 'src/app/services/socket.io.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	users: Users[] = [];
	tables: Table[] = [];
	constructor(private userService: UserService, activatedRoute: ActivatedRoute,
		        private socketIoService : SocketIoService) {
	}

	ngOnInit(): void { }
}
