import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '../shared/models/httpOptions';
import { Orders } from '../shared/models/orders';
import { Observable } from 'rxjs';
import { ORDERS_URL, TABLES_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OrdersService {

	httpOptions : HttpOptions = new HttpOptions();

	constructor(private http: HttpClient, private toastrService : ToastrService ) { }


	newOrder(Order : Orders, n_table: Number) : Observable<Orders>{
		return this.http.post<Orders>(TABLES_URL+'/'+n_table+'/add_order', Order, this.httpOptions).pipe(
			tap({
				next: () => {
					this.toastrService.success('Order sended' );
				},
				error: (errorResponse) => {
					this.toastrService.error('Order Failed')			
				}
			})
		);
	}

	getAllOrdersInThisTable(n_table: Number) : Observable<Orders[]>{
		return this.http.get<Orders[]>(TABLES_URL+'/'+n_table, this.httpOptions);
	}

	getAllOrders() : Observable<Orders[]>{
		return this.http.get<Orders[]>(ORDERS_URL,this.httpOptions);
	}

	deleteOrderById(id: string):Observable<Orders>{
		return this.http.delete<Orders>(ORDERS_URL+'/'+id+'/delete', this.httpOptions).pipe(
			tap({
				next: () => {
					this.toastrService.success('Order settled');
				},
				error: (errorResponse) => {
					this.toastrService.error('Order Failed');			
				}
			})
		);
	}
}
