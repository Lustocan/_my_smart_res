import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { Observable, catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-tables',
	templateUrl: './tables.component.html',
	styleUrls: ['./tables.component.css']
})

// TODO -> sistemare il placeholder di customers, quando lo schermo si rimpicciolisce i 4 bottoni si sminchiano
//         fare in modo che per sendare un ordine bisogna aver fillato i customers

export class TablesComponent implements OnInit {
	tables: Table[] = [];

	role : String = '' ;

	constructor(private tableService: TableService, private router: Router, private toastrService : ToastrService) {
		let tableObservable = tableService.getAll().pipe(
			catchError((error)=>{
				if(error instanceof HttpErrorResponse){
					this.toastrService.error('You must log first');
					this.router.navigateByUrl('/login');
				}
				return new Observable<Table[]>();
			
			})
			
		);

		tableObservable.subscribe((serverTable) => this.tables = serverTable);
	}

	ngOnInit(): void {
         this.role = window.sessionStorage.getItem('my-role') || "" ;
	}

	is_waiter(){
		return this.role === 'waiter' ?  true : false ;
    }

	is_casher(){
		return this.role === 'casher' ?  true : false ;
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
}
