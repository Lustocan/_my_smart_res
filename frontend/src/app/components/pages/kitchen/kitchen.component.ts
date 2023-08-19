import { Component, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client';
import { OrdersService } from 'src/app/services/orders.service';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { Kind } from 'src/app/shared/models/menù';
import { Orders } from 'src/app/shared/models/orders';
import { Subject } from 'rxjs';


const elem : String[] = [] ;

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
	orders : Orders[] = [];


	user = new Orders()       ;
	subject : Subject<any> = new Subject();

	constructor(private ordersService :OrdersService, private socketIoService : SocketIoService){
	}

	ngOnInit(): void {
		this.socketIoService.onFetch().subscribe((el : any) => {
			this.subject.next(el);
		})
	    this.subject.subscribe((el)=>elem.push(el));
		
		this.ordersService.getAllOrders().subscribe((serverOrder) => this.orders = serverOrder);

	}


	public nDishesOrDessert(order : Orders){
		let p = order.to_prepare?.filter((elem) => this.isDishes(elem.kind));
		if(p){
			return p.length > 0;
		}
		else{
			return false;
		}
	}

	public isDishes(kind: any) : boolean{
		return kind === 'dishes' || kind === 'dessert';
	}


	clik(){
		console.log(elem);
	}

}
