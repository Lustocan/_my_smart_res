import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../shared/models/table';
import { Observable, Subject, catchError, timeout } from 'rxjs';
import { HttpOptions } from '../shared/models/httpOptions';
import { ADD_TABLES_URL, TABLES_URL } from '../shared/constants/urls';
import { ITable } from '../shared/interfaces/ITable_add';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class TableService {
	httpOptions = new HttpOptions();
	//tables : Table[] = [];
	subject : Subject<Table[]> = new Subject();

	constructor(private http: HttpClient, private toastrService : ToastrService) {}

	getAll() : Observable<Table[]> {
		return this.http.get<Table[]>(TABLES_URL,this.httpOptions);
	}

	getTableByNumber(number : string) : Observable<Table> {
		return this.http.get<Table>(TABLES_URL+'/'+number,this.httpOptions);
	}

	deleteTable(number: string): Observable<Table>{
		return this.http.delete<Table>(TABLES_URL+'/'+number+'/delete',this.httpOptions)
			.pipe(catchError(()=>{  
				alert("Table doesn't exist");
				return new Observable<Table>;
			}));
	}

	updateTable(number:string, costumers: Number): Observable<Table>{
		return this.http.patch<Table>(TABLES_URL+'/'+number+'/update',{customers: costumers},this.httpOptions)
			.pipe(catchError(()=>{  
				alert("Table doesn't exist or more costumers then seats");
				return new Observable<Table>;
			}));
	}

	buildTable(newTable : ITable) {
		return this.http.post<Table>(ADD_TABLES_URL, newTable, this.httpOptions).pipe(
			tap({
				next: (table) => { 
					this.toastrService.success('Table successfully added');
				},
				error: (errorResponse) => {
					this.toastrService.error('Add table failed');
				}
			})
		);
	}

}
