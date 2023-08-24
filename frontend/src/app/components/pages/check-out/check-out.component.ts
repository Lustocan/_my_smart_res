import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject ,catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Orders } from 'src/app/shared/models/orders';
import { BillsService } from 'src/app/services/bills.service';
import { Bills } from 'src/app/shared/models/bills';
import { TableService } from 'src/app/services/table.service';



@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit  {

  order = new Orders(new Date(), 0, new Array(), new Array());
  tot_price = 0 ;

  bool   = true ;
  
  num : any ;

  constructor(private billsService : BillsService, private toastrService : ToastrService,
              private router : Router, private route : ActivatedRoute,
              private ordersService : OrdersService, private tableService : TableService ){
               
              this.num = route.snapshot.paramMap.get('number'); 
  } 


  
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
            for(let i=0; i<serverOrder.length; i++){
              //if(serverOrder[i].ready_b&&serverOrder[i].ready_k){
                  for(let j=0; j<serverOrder[i].to_prepare.length; j++){
                      let am = 0, price = 0  ;
                      delete serverOrder[i].to_prepare[j]['kind']
                      delete serverOrder[i].to_prepare[j]['time']
                      this.order.to_prepare.push(serverOrder[i].to_prepare[j])
                      this.order.staff.push(serverOrder[i].staff[j])
                      price = +price+ + +serverOrder[i].to_prepare[j].price ;
                      am = +am+ +  +serverOrder[i].to_prepare[j].amount ;
                      this.tot_price += (am*price)
                  }
              //}
            //  else{
            //    this.bool = false ;
             // }
            }
      });       
  }

  calculate(){
      this.billsService.newBill({ n_table : this.num ,operators : this.order.staff, 
                                  served : this.order.to_prepare , payment : this.tot_price,
                                  date : this.order.date }, this.num ).subscribe();

      if(this.bool) this.tableService.updateTable(this.num , 0).subscribe();

      setTimeout(function(){
        location.reload();
      }, 1500)
  }

  row_price(price : Number, amount : Number){
      let p = +price , a = +amount ;
      return p*a ;
  }
}