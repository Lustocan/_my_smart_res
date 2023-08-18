import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Kind } from 'src/app/shared/models/menù';
import { Orders } from 'src/app/shared/models/orders';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
	orders : Orders[] = [];
	constructor(private ordersService :OrdersService){
	}

	ngOnInit(): void {
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
}
