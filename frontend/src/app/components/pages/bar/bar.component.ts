import { Component, OnInit } from '@angular/core';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from 'src/app/shared/models/orders';
import { Subject, Observable, catchError } from 'rxjs';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.css']
})
export class BarComponent {
	orders: Orders[] = [];
	wip: any;
	browserRefresh = false;
	session: string = "";

	timeLeft: number = 0;
	interval: any;

	minutes: number  = 0;
	seconds: number  = 0;


	constructor(private ordersService: OrdersService, private socketIoService: SocketIoService,
		        private toastrService: ToastrService, private router : Router) {}

	ngOnInit(): void {
		let orderObservable = this.ordersService.getAllOrders().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					this.toastrService.error('You must log first');
					this.router.navigateByUrl('/login');
				}
				return new Observable<Orders[]>();
			})

		)
		orderObservable.subscribe((serverOrder) => {
			let i = 0;
			while (!this.wip && i < serverOrder.length) {
				if (!serverOrder[i].ready_b) {
					this.wip = serverOrder[i];
					serverOrder.splice(i, 1);
				}
				i++;
			}
			if (window.sessionStorage.getItem('my-counter')) {
				this.session = window.sessionStorage.getItem('my-counter') || ""
				this.timeLeft = parseInt(this.session)
				this.minutes = Math.floor(this.timeLeft/60) ;
			    this.seconds = this.timeLeft%60 ;
			} else {
				this.timeLeft = this.wip.bar_time * 60;
			}
			this.orders = serverOrder;
		});
	}


	public nDrinksOrCoffeOrders(order: Orders): boolean {
		let p = order.to_prepare?.filter((elem) => this.isDrinksOrCoffe(elem.kind, order.ready_b));
		if (p) return p.length > 0;
		else   return false;
	}

	public isDrinksOrCoffe(kind: any, ready_b : any): boolean {
		return (kind === 'drinks' || kind === 'coffe_bar') && (!ready_b) ;
	}

	startTimer() {
		if (window.sessionStorage.getItem('my-counter')) {
			this.session = window.sessionStorage.getItem('my-counter') || ""
			this.timeLeft = parseInt(this.session)
		}
		this.interval = setInterval(() => {
		  if(this.timeLeft > 0) {
			 this.timeLeft--;
			 this.minutes = Math.floor(this.timeLeft/60) ;
			 this.seconds = this.timeLeft%60 ;
			 window.sessionStorage.setItem('my-counter', this.timeLeft.toString());
		  }
		  else{
			 window.sessionStorage.removeItem('my-counter');
			 this.ordersService.updateOrder(this.wip._id, this.wip.ready_k , true).subscribe();
			 this.socketIoService.send_w(this.wip.staff[0]);
			 setTimeout(function(){
				location.reload();
			}, 1500 )
		  }
		  
		},1000)
	}

	pauseTimer() {
		clearInterval(this.interval);
	}

	sec(){
       return this.seconds<10 ;
	}

	ready() {
		window.sessionStorage.removeItem('my-counter');
		this.ordersService.updateOrder(this.wip._id, this.wip.ready_k , true).subscribe();
		this.socketIoService.send_w(this.wip.staff[0]);
		setTimeout(function(){
			location.reload();
		}, 1500)
	}

	get_current(){
		if(this.wip.staff){
			return this.wip.staff[0].username ;
		}
		return null ;
	}

	get_waiter(order : Orders){
		if(order.staff){
			return order.staff[0].username ;
		}
		return null ;
	}
}
