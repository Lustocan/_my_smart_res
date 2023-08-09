import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../shared/models/table';
import { Observable } from 'rxjs';
import { HttpOptions } from '../shared/models/httpOptions';
import { ADD_TABLES_URL, TABLES_URL } from '../shared/constants/urls';

@Injectable({
	providedIn: 'root'
})
export class TableService {
	httpOptions = new HttpOptions();
	tables : Table[] = [];
	

	constructor(private http: HttpClient) {}

	async getAll() : Promise<Observable<Table[]>> {
		return this.http.get<Table[]>(TABLES_URL,this.httpOptions);
	}

	async buildTable(newTable: Table) : Promise<undefined | Observable<Table>>{
		let promise = await this.getAll();
		//promise.then((tableObservable)=> tableObservable.subscribe((serverTables) => this.tables = serverTables));
		promise.subscribe((serverTables) => this.tables = serverTables);
		let table = this.tables.filter((t) => t._id === newTable._id);
		if( table.length > 0){
			alert("id already exists, please enter a unique id for this table.");
		}
		table = [];
		table = this.tables.filter((t) => t.number === newTable.number);
		if( table.length > 0){
			alert("number already exists, please enter a unique number for this table.");
			return;
		}
		else{
			let t = this.http.post<Table>(ADD_TABLES_URL,newTable,this.httpOptions);
			alert("TABLE  SUCCESFULL ADDED");
			return t;
		}

	}

	deleteTable(id: String){
		//this.http.delete()

	}

}
