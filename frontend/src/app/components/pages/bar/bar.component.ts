import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from 'src/app/shared/models/orders';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  orders : Orders[] = [];
	constructor(private ordersService :OrdersService){
	}

	ngOnInit(): void {
		this.ordersService.getAllOrders().subscribe((serverOrder) => this.orders = serverOrder);
	}


	public nDrinksOrCoffeOrders(order : Orders) : boolean{
		let p = order.to_prepare?.filter((elem) => this.isDrinksOrCoffe(elem.kind));
		if(p){
			return p.length > 0;
		}
		else{
			return false;
		}
	}

	public isDrinksOrCoffe(kind: any) : boolean{
		return kind === 'drinks' || kind === 'coffe_bar' ;
	}
}
