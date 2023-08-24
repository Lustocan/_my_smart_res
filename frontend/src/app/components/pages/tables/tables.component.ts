import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { Users } from 'src/app/shared/models/users';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-tables',
	templateUrl: './tables.component.html',
	styleUrls: ['./tables.component.css']
})

// TODO -> sistemare il placeholder di customers, quando lo schermo si rimpicciolisce i 4 bottoni si sminchiano
//         fare in modo che per sendare un ordine bisogna aver fillato i customers

export class TablesComponent implements OnInit {
	
	user = new Users()   ;
	tables: Table[] = [] ;

	constructor(private tableService: TableService, private router: Router, 
		        private toastrService : ToastrService, private userService : UserService) {}

	ngOnInit(): void {
		this.getUser()      ;
		this.getAllTables() ;
	}

	is_waiter(){
		return this.user.role === 'waiter' ?  true : false ;
    }

	is_casher(){
		return this.user.role === 'casher' ?  true : false ;
	}

	getUser(){
		this.userService.getIt().pipe(catchError((error)=>{
					return new Observable<Users>;
				})).subscribe((serverUser) => {
					this.user = serverUser ;
		})      
    } 

	submitDelete(number: Number) {
		this.tableService.deleteTable(number).subscribe(() => {
			this.router.navigateByUrl('/tables').then(() => {
				setTimeout(function () {
					location.reload();
				}, 1500
				)
			})
		});
	}

	getAllTables(){
        this.tableService.getAll().pipe(
			catchError((error)=>{
				if(error instanceof HttpErrorResponse){
					if(error.status===400){
						this.toastrService.error('Login required');
						this.router.navigateByUrl('/login');
					}
					else if(error.status===403){
						this.toastrService.error('Unauthorized');
						this.router.navigateByUrl('/');
					}
				}
				return new Observable<Table[]>();
			
			})	
		).subscribe((serverTable) => this.tables = serverTable);
	}
}
