import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
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
		this.ordersService.getAllOrders().subscribe((serverOrder) => this.orders = serverOrder );
	}
}
