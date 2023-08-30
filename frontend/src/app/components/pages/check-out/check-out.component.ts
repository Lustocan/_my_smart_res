import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Orders } from 'src/app/shared/models/orders';
import { BillsService } from 'src/app/services/bills.service';
import { Bills } from 'src/app/shared/models/bills';
import { TableService } from 'src/app/services/table.service';



@Component({
	selector: 'app-check-out',
	templateUrl: './check-out.component.html',
	styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

	order = new Orders(new Date(), 0, new Array(), new Array());
	tot_price = 0;
	orders: Orders[] = [];

	bool = true;

	num: any;

	constructor(private billsService: BillsService, private toastrService: ToastrService,
		        private router: Router, private route: ActivatedRoute,
	        	private ordersService: OrdersService, private tableService: TableService) {

		        this.num = route.snapshot.paramMap.get('number');
	}



	ngOnInit(): void {
		this.getAllInThisTable();
	}


	row_price(price: Number, amount: Number) {
		let p = +price, a = +amount;
		return p * a;
	}

	calculate() {
		return this.billsService.newBill({
			n_table: this.num, operators: this.order.staff,
			served: this.order.to_prepare, payment: this.tot_price,
			date: this.order.date
		}, this.num).subscribe()
	}


	getAllInThisTable(){
		this.ordersService.getAllOrdersInThisTable(this.num).pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					this.toastrService.error('Login required.');
					this.router.navigateByUrl('/login');
				}
				return new Observable<Orders[]>();
			})
		).subscribe((serverOrder) => {
			for (let i = 0; i < serverOrder.length; i++) {
				for (let j = 0; j < serverOrder[i].to_prepare.length; j++) {
					let am = 0, price = 0;
					delete serverOrder[i].to_prepare[j]['time']
					this.order.to_prepare.push(serverOrder[i].to_prepare[j])
					if(this.order.staff.length<3&&serverOrder[i].staff.length>2){ 
						this.order.staff = [] ;
						this.order.staff.push(serverOrder[i].staff[0])
						this.order.staff.push(serverOrder[i].staff[1])
						this.order.staff.push(serverOrder[i].staff[2])
					}
					else if(this.order.staff.length<3&&serverOrder[i].staff.length<3){
						this.order.staff = [] ;
						this.order.staff.push(serverOrder[i].staff[0])
						this.order.staff.push(serverOrder[i].staff[1])
					}
					price = +price + + +serverOrder[i].to_prepare[j].price;
					am = +am + +  +serverOrder[i].to_prepare[j].amount;
					this.tot_price += (am * price)
				}
			}
			this.orders = serverOrder;
		});
	}


	pay(): void {
		let flag: boolean = true;
		for (const order of this.orders) {
			let dishes = order.to_prepare.filter((elem) => elem.kind === 'dishes' || elem.kind === 'dessert');
			let drinks = order.to_prepare.filter((elem) => elem.kind === 'drinks' || elem.kind === 'coffe_bar');
			if (flag) {
				if (((order.ready_k && order.ready_b) || (dishes.length <= 0 && order.ready_b) ||
				     (drinks.length <= 0 && order.ready_k) || (drinks.length <= 0 && dishes.length <= 0))) {
					
					flag = true;
				}
				else {
					flag = false;
				}
			}
		}
		if (flag&&this.tot_price>0) {
			this.calculate()
			this.ordersService.deleteAllOrdersInThisTable(this.num).pipe(
				tap({
					next: () => {
						this.toastrService.success('Order Paid');
					},
					error: (errorResponse) => {
						this.toastrService.error('Payment Failed');
					}
				})).subscribe(() => {
					this.tableService.updateTable(this.num, 0).subscribe();
						setTimeout(() => {
							this.router.navigateByUrl('/tables');
						}, 1500)
		            });
		}
		else {
			if(this.tot_price>0) this.toastrService.error('Something still preparing');
			else                 this.toastrService.error('Order empty');
		}
	}
}