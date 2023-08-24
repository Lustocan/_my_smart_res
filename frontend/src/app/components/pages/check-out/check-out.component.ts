import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'src/app/shared/models/table';
import { Observable, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Orders } from 'src/app/shared/models/orders';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit  {

  orders: Orders[] = [];
  total_order = new Orders(new Date()) ;
  num : any ;

  constructor(private ordersService : OrdersService, private toastrService : ToastrService,
              private router : Router,  route : ActivatedRoute ){
               
              this.num = route.snapshot.paramMap.get('number'); } 
  

  ngOnInit(): void {
    let orderObservable = this.ordersService.getAllOrdersInThisTable(this.num).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse) {
              this.toastrService.error('Login required.');
              this.router.navigateByUrl('/login');
            }
            return new Observable<Orders[]>();
        })
      )

      orderObservable.subscribe((serverOrder) => {
            this.orders = serverOrder;
            for(let i=0; i<serverOrder.length; i++){
               console.log(serverOrder[i].total_price)
            }
      });
      
  }
}