import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '../shared/models/httpOptions';
import { Bills } from '../shared/models/bills';
import { Observable } from 'rxjs';
import { BILLS_URL, TABLES_URL } from '../shared/constants/urls';


@Injectable({
	providedIn: 'root'
})
export class BillsService {

	httpOptions : HttpOptions = new HttpOptions();

	constructor(private http: HttpClient ) { }


	newBill(bill : Bills, n_table: Number) : Observable<Bills>{
		return this.http.post<Bills>(TABLES_URL+'/'+n_table+'/bill', bill, this.httpOptions);
	}

	getAllBills(): Observable<Bills[]> {
		return this.http.get<Bills[]>(BILLS_URL , this.httpOptions);
	}
}
