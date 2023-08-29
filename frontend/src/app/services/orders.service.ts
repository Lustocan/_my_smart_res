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

	httpOptions: HttpOptions = new HttpOptions();

	constructor(private http: HttpClient, private toastrService: ToastrService) { }


	newOrder(Order: Orders, n_table: Number): Observable<Orders> {
		return this.http.post<Orders>(TABLES_URL + '/' + n_table + '/add_order', Order, this.httpOptions).pipe(
			tap({
				next: () => {
					this.toastrService.success('Order sended');
				},
				error: (errorResponse) => {
					this.toastrService.error('Order Failed')
				}
			})
		);
	}

	getAllOrdersInThisTable(n_table: Number): Observable<Orders[]> {
		return this.http.get<Orders[]>(ORDERS_URL + '/' + n_table, this.httpOptions);
	}

	getAllOrder(): Observable<Orders[]> {
		return this.http.get<Orders[]>(ORDERS_URL, this.httpOptions);
	}

	getAllOrderK(): Observable<Orders[]> {
		return this.http.get<Orders[]>(ORDERS_URL + '/kitchen/queue', this.httpOptions);
	}

	getAllOrderB(): Observable<Orders[]> {
		return this.http.get<Orders[]>(ORDERS_URL + '/bar/queue', this.httpOptions);
	}


	deleteOrderById(id: String): Observable<Orders> {
		return this.http.delete<Orders>(ORDERS_URL + '/' + id + '/delete', this.httpOptions).pipe(
			tap({
				next: () => {
					this.toastrService.success('Order deleted');
					setTimeout(function(){
						location.reload();
					}, 1500)
				},
				error: (errorResponse) => {
					this.toastrService.error('Delete Failed');
				}
			})
		);
	}

	updateOrder(_id : String, staff : Array<{username : String, role : String }>,  ready_k : Boolean, ready_b : Boolean, kitchen_time : Number, bar_time : Number) : Observable<Orders> {
		return this.http.patch<Orders>(ORDERS_URL+'/'+ _id + '/update', { staff : staff ,ready_k : ready_k, ready_b : ready_b, kitchen_time : kitchen_time , bar_time : bar_time}, this.httpOptions) 
	}

	updatePrepOrder(_id : String, to_prepare: Array<{_id : String, element: String, amount : Number, price : Number, kind : String, time ?: Number }>) : Observable<Orders> {
		return this.http.patch<Orders>(ORDERS_URL+'/'+ _id + '/update', { to_prepare : to_prepare }, this.httpOptions) 
	}

	deleteAllOrdersInThisTable(n_table: Number): Observable<any> {
		return this.http.delete<any>(ORDERS_URL + '/' +  n_table, this.httpOptions);
	}
}
