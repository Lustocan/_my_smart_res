import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { Orders } from 'src/app/shared/models/orders';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
	orders : Orders[] = [] ;
	wip    : any           ;
	browserRefresh = false;
	session : string = "" ;

	timeLeft: number = 0;
    interval : any ;

	subject : Subject<any> = new Subject();

	constructor(private ordersService :OrdersService, private socketIoService : SocketIoService){}

	ngOnInit(): void {
		
		this.ordersService.getAllOrders().subscribe((serverOrder) => {
			let i = 0;
			while(!this.wip&&i<serverOrder.length){
				if(!serverOrder[i].ready_k){ 
					this.wip = serverOrder[i];
					serverOrder.splice(i,1);
				}
				i++ ;
			}
			if(window.sessionStorage.getItem('my-counter')){
				this.session = window.sessionStorage.getItem('my-counter')||""
				this.timeLeft = parseInt(this.session)
			}else{
                this.timeLeft = this.wip.kitchen_time*60 ;
			}
			this.orders = serverOrder;
	    });

	}


	public nDishesOrDessert(order : Orders){
		let p = order.to_prepare?.filter((elem) => this.isDishes(elem.kind, order.ready_k));
		if(p)  return p.length > 0;
		else   return false;
	}

	public isDishes(kind : any, ready_k : any) : boolean{
		return (kind === 'dishes' || kind === 'dessert')&&(!ready_k);
	}

	startTimer() {
		if(window.sessionStorage.getItem('my-counter')){
			this.session = window.sessionStorage.getItem('my-counter')||""
			this.timeLeft = parseInt(this.session)
		}
		this.interval = setInterval(() => {
		  if(this.timeLeft > 0) {
			 this.timeLeft--;
			 window.sessionStorage.setItem('my-counter', this.timeLeft.toString());
		  }
		  else{
			 window.sessionStorage.removeItem('my-counter');
			 this.ordersService.updateOrder(this.wip._id,  true , false).subscribe();
			 this.socketIoService.send_w(this.wip.waiter);
			 setTimeout(function(){
				location.reload();
			}, 1500 )
		  }
		  
		},1000)
	}
	
	pauseTimer() {
		clearInterval(this.interval);
	}

	ready(){
		window.sessionStorage.removeItem('my-counter');
		this.ordersService.updateOrder(this.wip._id,  true , false).subscribe();
		this.socketIoService.send_w(this.wip.waiter);
		setTimeout(function(){
			location.reload();
		}, 1500 )
	}
}
