import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/shared/models/users';
import { Orders } from 'src/app/shared/models/orders';
import { OrdersService } from 'src/app/services/orders.service';
import { BillsService } from 'src/app/services/bills.service';
import { Bills } from 'src/app/shared/models/bills';
import { SocketIoService } from 'src/app/services/socket.io.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	users  : Users[]  = [] ;

	orders : Orders[] = [] ;
	
	bills  : Bills[]  = [] ;
	
	today  : Orders[] = [] ;

	date  ;

	constructor(private userService: UserService, private router: Router, private toastrService: ToastrService,
		        private ordersService : OrdersService, private billsService : BillsService, private socketService : SocketIoService) { 
					this.date = new Date() ;
				}

	ngOnInit(){
		this.getUsers()     ;
		this.getAllOrders() ;
		this.getAllBills()      ;
	}

	submitDelete(id: string) {
		this.userService.deleteUser(id).subscribe(() => {
			this.socketService.send_d(id) ;
			location.reload();
		});
	}

	getUsers(){
		this.userService.getAll().pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					if(error.status===401){
						this.toastrService.error('Login required');
					    this.router.navigateByUrl('/login');
					}
					else if(error.status===403){
						this.toastrService.error('Unathorized');
					    this.router.navigateByUrl('/');
					}
				}
				return new Observable<Users[]>();
			})).subscribe((serverUsers) => this.users = serverUsers);
	}

	getAllOrders(){
		this.ordersService.getAllOrder().pipe(
			catchError((error) => {
				return new Observable<Orders[]>();
			})
		).subscribe((serverOrder) => {
			this.orders = serverOrder ;
		});
	}

	getAllBills(){
		this.billsService.getAllBills().pipe(
			catchError((error) => {
				return new Observable<Bills[]>();
			})
		).subscribe((serverOrder) => {
			this.bills = serverOrder ;
		});
	}

	countTotalwork(user : String) : Number {
		let cnt = 0 ; 
		for(let i=0; i<this.bills.length; i++){
			for(let j=0; j<this.bills[i].operators.length; j++){
				if(this.bills[i].operators[j].username===user) cnt++ ;
			}
		}
		return cnt ;
	}

	countTotaldishes(user : String) : Number {
		let cnt = 0 ; 
		for(let i=0; i<this.bills.length; i++){
			for(let j=0; j<this.bills[i].operators.length; j++){
				if(this.bills[i].operators[j].username===user){
					for(let k=0; k<this.bills[i].served.length; k++){
						if((this.bills[i].served[k].kind==='dishes')||(this.bills[i].served[k].kind==='dessert')) cnt++ ;
					}
				}
			}
		}
		return cnt ;
	}

	countTotaldrinks(user : String) : Number {
		let cnt = 0 ; 
		for(let i=0; i<this.bills.length; i++){
			for(let j=0; j<this.bills[i].operators.length; j++){
				if(this.bills[i].operators[j].username===user){
					for(let k=0; k<this.bills[i].served.length; k++){
						if((this.bills[i].served[k].kind==='drinks')||this.bills[i].served[k].kind==='coffe-bar'){
							 cnt++ 
							};
					}
				}
			}
		}
		return cnt ;
	}
}
