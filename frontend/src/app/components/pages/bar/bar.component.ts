import { Component, OnInit } from '@angular/core';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from 'src/app/shared/models/orders';
import {  Observable, catchError } from 'rxjs';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.css']
})
export class BarComponent {
	orders: Orders[] = [];
	wip: any             ;  
	session: string = "" ;

	timeLeft: number = 0 ;
	interval: any        ;
	minutes: number  = 0 ;
	seconds: number  = 0 ;


	constructor(private ordersService: OrdersService, private socketIoService: SocketIoService,
		        private toastrService: ToastrService, private router : Router) {}

	ngOnInit(): void {
		this.getAllOrders();
	}

	sec(){
		return this.seconds<10 ;
	}

	pauseTimer() {
		clearInterval(this.interval);
	}

	isDrinksOrCoffe(kind: any, ready_b : any): boolean {
		return (kind === 'drinks' || kind === 'coffe_bar') && (!ready_b) ;
	}

	nDrinksOrCoffeOrders(order: Orders): boolean {
		let p = order.to_prepare?.filter((elem) => this.isDrinksOrCoffe(elem.kind, order.ready_b));
		if (p) return p.length > 0;
		else   return false;
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

	initTime(){
        let time = this.wip.kitchen_time ;
		time *= 60                       ;
		window.sessionStorage.setItem('my-counter', time) 
		this.session = window.sessionStorage.getItem('my-counter') || ""
	}

	ready() {
		window.sessionStorage.removeItem('my-counter');
		this.ordersService.updateOrder(this.wip._id, this.wip.ready_k , true).subscribe();
		this.socketIoService.send_w(this.wip.staff[0]);
		if(this.orders.length>0&&this.orders[0].kitchen_time){
			window.sessionStorage.setItem('my-counter', this.orders[0].kitchen_time.toString()||'')
		 }
		setTimeout(function(){
			location.reload();
		}, 1500)
	}

	kick_invalid(){
		for(let i=0; i<this.orders.length; i++){
			if(this.orders[i].ready_b){
				this.orders.splice(i, 1);
			}
		}
	}

	partition(start : number, end : number) : number {
        let pivot = this.orders[end], i = start - 1 , tmp ;

		for(let j=start; j<end; j++){
			if(this.orders[j].date<=pivot.date){
				++i ;
				tmp = this.orders[i] ;
				this.orders[i] = this.orders[j] ;
				this.orders[j] = tmp ;
			}
		}
		this.orders[end] = this.orders[i+1] ;
		this.orders[i+1] = pivot ;
		return i+1 ;
	}

	quick_sort (start : number , end : number){
		if(start<end){
           let pivot = this.partition(start, end);

		   this.quick_sort(start, pivot-1);
		   this.quick_sort(pivot+1, end);
		}
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
			 if(this.orders.length>0&&this.orders[0].kitchen_time){
				window.sessionStorage.setItem('my-counter', this.orders[0].kitchen_time.toString()||'')
			 }
			 setTimeout(function(){
				location.reload();
			}, 500 )
		  }
		  
		},1000)
	}

	getAllOrders(){
		this.ordersService.getAllOrder().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					if(error.status===400){
						this.toastrService.error('Login required');
						this.router.navigateByUrl('/login');
					}
					else if(error.status===403){
						this.toastrService.error('Unauthorized');
						this.router.navigateByUrl('/');
					}
				}
				return new Observable<Orders[]>();
			})
		).subscribe((serverOrder) => {
			this.orders = serverOrder;
			this.kick_invalid();
			this.quick_sort(0, this.orders.length-1);
			this.wip = this.orders.shift();
            this.initTime();
		});
	}


	
}
