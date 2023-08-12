import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../shared/models/table';
import { Observable, Subject, catchError, timeout } from 'rxjs';
import { HttpOptions } from '../shared/models/httpOptions';
import { ADD_TABLES_URL, TABLES_URL } from '../shared/constants/urls';

@Injectable({
	providedIn: 'root'
})
export class TableService {
	httpOptions = new HttpOptions();
	//tables : Table[] = [];
	subject : Subject<Table[]> = new Subject();

	constructor(private http: HttpClient) {}

	getAll() : Observable<Table[]> {
		return this.http.get<Table[]>(TABLES_URL,this.httpOptions);
	}

	buildTable(newTable: Table) : void{
		this.subject = new Subject<Table[]>();
		this.getAll().subscribe((serverTables) => this.subject.next(serverTables));
		this.subject.subscribe((tables) =>{
			let table = tables.filter((t) => t._id === newTable._id);
			if( table.length > 0){
				alert("id already exists, please enter a unique id for this table.");
			}
			table = [];
			table = tables.filter((t) => t.number === newTable.number);
			if( table.length > 0){
				alert("number already exists, please enter a unique number for this table.");
			}
			else{
				this.http.post<Table>(ADD_TABLES_URL,newTable,this.httpOptions).subscribe((table) => console.log(table._id));
				alert("TABLE  SUCCESFULL ADDED");
			}
		});

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

}
