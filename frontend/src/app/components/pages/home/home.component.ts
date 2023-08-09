import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/users'
import { usersService } from 'src/app/services/users.service'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Table } from 'src/app/shared/models/table';
import { TableService } from 'src/app/services/table.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	users: Users[] = [];
	tables: Table[] = [];
	constructor(private usersService: usersService, activatedRoute: ActivatedRoute, private tableService: TableService) {
		let usersObservable: Observable<Users[]>;
		let tablesObservable: Observable<Table[]>;
		activatedRoute.params.subscribe(params => {
			if (params.searchTerm) {
				//usersObservable = this.usersService.getAllUsersBySearchTerm(params.searchTerm) ;
			}
			else {
				usersObservable = usersService.getAll();
				//tablesObservable = tableService.getAll();
			}
			usersObservable.subscribe((serverUsers) => {
				this.users = serverUsers;
			});
			//tablesObservable.subscribe((serverTables)=> this.tables = serverTables);
		})
	}

	ngOnInit(): void {
	}
}
