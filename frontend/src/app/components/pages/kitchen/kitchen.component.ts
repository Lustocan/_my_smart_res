import { Component, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client';
import { OrdersService } from 'src/app/services/orders.service';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { Kind } from 'src/app/shared/models/menù';
import { Orders } from 'src/app/shared/models/orders';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';




const elem : String[] = [] ;

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
	orders : Orders[] = [] ;
	wip    : any           ;
	browserRefresh = false;

	timeLeft: number = 0;
    interval : any ;



	subject : Subject<any> = new Subject();

	constructor(private ordersService :OrdersService, private socketIoService : SocketIoService){}

	ngOnInit(): void {

		this.socketIoService.recive_k(); 
		
		this.ordersService.getAllOrders().subscribe((serverOrder) => {
			let i = 0;
			while(!this.wip&&i<serverOrder.length){
				if(!serverOrder[i].ready_k){ 
					this.wip = serverOrder.shift();
				}
				i++ ;
			}
			this.timeLeft = this.wip.kitchen_time*60 ;
			this.orders = serverOrder;
	    });

		window.onbeforeunload = function () {
			console.log("Ciao")
		 };
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
		this.interval = setInterval(() => {
		  if(this.timeLeft > 0) {
			 this.timeLeft--;
		  }
		  else{
			 this.timeLeft = 60 ;
		  }
		  
		},1000)
	  }
	
	  pauseTimer() {
		clearInterval(this.interval);
	  }


	clik(){
		console.log(elem);
	}

}
