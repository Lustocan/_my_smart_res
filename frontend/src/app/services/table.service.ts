import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../shared/models/table';
import { Observable } from 'rxjs';
import { HttpOptions } from '../shared/models/httpOptions';
import { Users } from '../shared/models/users';
import { TABLES_URL } from '../shared/constants/urls';

@Injectable({
	providedIn: 'root'
})
export class TableService {

	constructor(private http: HttpClient) {}

	getAll() : Observable<Table[]> {
		let httpOptions = new HttpOptions();
		return this.http.get<Users[]>(TABLES_URL,httpOptions);
	}
}
