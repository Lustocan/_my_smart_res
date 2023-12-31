import { Component, OnInit } from '@angular/core';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from 'src/app/shared/models/orders';
import {  Observable, catchError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/shared/models/users';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
	me    = new Users()  ;
	orders: Orders[] = [];
	queue : Orders[] = [];  

	wip: any             ;  
	session: string = "" ;

	timeLeft: number = 0 ;
	interval: any        ;

	minutes: number  = 0 ;
	seconds: number  = 0 ;

	start : boolean = true ;


	constructor(private ordersService: OrdersService, private socketIoService: SocketIoService,
		        private toastrService: ToastrService, private router : Router,
				private userService  : UserService) {}

	ngOnInit(): void {
		this.getAllOrders();
		this.getUser()     ;
	}

	min(){
		return this.minutes<10 ;
	}

	sec(){
		return this.seconds<10 ;
	}

	minConv(el : Number = 0){
        let e = +el ;
		return e/60 ;
	}

	price(am : Number, price : Number ){
		let a= +am , p = +price ; 
		return a*p ;
	}

	testAndSet(){
		let el = this.start ;
		this.start = !this.start ;
		return el ;
	}

	pauseTimer() {
		clearInterval(this.interval);
		this.testAndSet() ;
	}

	isDrinksOrCoffe(kind: any): boolean {
		return (kind === 'drinks' || kind === 'coffe_bar') ;
	}

	isCasher(role : String) : Boolean{
		return this.me.role==='casher';
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
		this.session = this.wip.bar_time ;
		this.timeLeft = parseInt(this.session)
		this.minutes = Math.floor(this.timeLeft/60) ;
		this.seconds = this.timeLeft%60 ;
	}

	getUser(){
		this.userService.getIt().pipe(catchError((error)=>{
					return new Observable<Users>;
				})).subscribe((serverUser) => {
					this.me = serverUser ;
		})      
    }

	ready() {
		this.wip.staff.push({username : this.me.username, role : this.me.role}) ;
		this.ordersService.updateOrder(this.wip._id, this.wip.staff , this.wip.ready_k , true, this.wip.kitchen_time, this.wip.bar_time).subscribe();
		this.socketIoService.send_w({username : this.wip.staff[0].username, use : "bar"});
		setTimeout(function(){
			location.reload();
		}, 1500)
	}

	deleteOrd(order : Orders){
		let v : Array<{_id : String, element: String, amount : Number, price : Number, kind : String, time ?: Number }> = [] ;
		for(let i=0; i<order.to_prepare.length; i++){
			if(!this.isDrinksOrCoffe(order.to_prepare[i].kind)){
				v.push(order.to_prepare[i])
			}
		}
		order.to_prepare = v ;
		if(order.to_prepare.length===0){
			if(order._id) this.ordersService.deleteOrderById(order._id).subscribe(()=>
				 setTimeout(function(){
					 location.reload();
				 }, 500 )
			)
		}
		else if(order._id&&order.to_prepare){
			this.ordersService.updatePrepOrder(order._id, order.to_prepare).subscribe(()=>{
				setTimeout(function(){
					location.reload();
				}, 500 )
			})
		}
	}

	kick_invalid(){
		for(let i=0; i<this.queue.length; i++){
			if(!this.queue[i].ready_b){
				let g = true ;
				for(let j=0; j<this.queue[i].to_prepare.length; j++){
                    if(this.isDrinksOrCoffe(this.queue[i].to_prepare[j].kind)&&g){
						let p = 0+ + +this.queue[i].to_prepare[j].price ;
						let a = 0+ + +this.queue[i].to_prepare[j].amount ;
						this.queue[i].to_prepare[j].price = p*a ;
						this.orders.push(this.queue[i]);
						g = false ;
					}
				}
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
		this.testAndSet() ;
		this.interval = setInterval(() => {
		  if(this.timeLeft > 0) {
			 this.timeLeft--;
			 console.log(this.timeLeft);
			 this.ordersService.updateOrder(this.wip._id, this.wip.staff , this.wip.ready_k , this.wip.ready_b, this.wip.kitchen_time, this.timeLeft).subscribe();
			 this.minutes = Math.floor(this.timeLeft/60) ;
			 this.seconds = this.timeLeft%60 ;
		  }
		  else{
			 this.wip.staff.push({username : this.me.username, role : this.me.role}) ;
			 this.ordersService.updateOrder(this.wip._id, this.wip.staff , this.wip.ready_k , true, this.wip.kitchen_time, this.wip.bar_time).subscribe();
			 this.socketIoService.send_w({username : this.wip.staff[0].username, use : "bar"});
			 setTimeout(function(){
				location.reload();
			}, 500 )
		  }
		  
		},1000)
	}

	getAllOrders(){
		this.ordersService.getAllOrderB().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					if(error.status===401){
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
			this.queue = serverOrder;
			this.kick_invalid()	
			this.quick_sort(0, this.orders.length-1);
			this.wip = this.orders.shift();
            this.initTime();
		});
	}
}
