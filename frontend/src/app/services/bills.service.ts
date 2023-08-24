import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '../shared/models/httpOptions';
import { Bills } from '../shared/models/bills';
import { Observable } from 'rxjs';
import { TABLES_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BillsService {

	httpOptions : HttpOptions = new HttpOptions();

	constructor(private http: HttpClient, private toastrService : ToastrService ) { }


	newBill(bill : Bills, n_table: Number) : Observable<Bills>{
		return this.http.post<Bills>(TABLES_URL+'/'+n_table+'/bill', bill, this.httpOptions).pipe(
			tap({
				next: () => {
					this.toastrService.success('Bill correctly created.' );
				},
				error: (errorResponse) => {
					this.toastrService.error('Bill creation failed.')			
				}
			})
		);
	}
}
