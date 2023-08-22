import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from 'src/app/shared/models/orders';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.css']
})
export class BarComponent {
	orders: Orders[] = [];
	constructor(private ordersService: OrdersService, private toastrService : ToastrService, private router : Router) {
	}

	ngOnInit(): void {
		this.ordersService.getAllOrders().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					this.toastrService.error('You must log first');
					this.router.navigateByUrl('/login');
				}
				return new Observable<Orders[]>();

			})

		).subscribe((serverOrder) => this.orders = serverOrder);
	}


	public nDrinksOrCoffeOrders(order: Orders): boolean {
		let p = order.to_prepare?.filter((elem) => this.isDrinksOrCoffe(elem.kind));
		if (p) {
			return p.length > 0;
		}
		else {
			return false;
		}
	}

	public isDrinksOrCoffe(kind: any): boolean {
		return kind === 'drinks' || kind === 'coffe_bar';
	}
}
