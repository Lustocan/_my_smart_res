import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MenùService } from 'src/app/services/menù.service';
import { Kind, Menù } from 'src/app/shared/models/menù';
import { OrdersService } from 'src/app/services/orders.service';
import { Users } from 'src/app/shared/models/users';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subject, catchError } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Orders } from 'src/app/shared/models/orders';
import { v4 as uuid } from 'uuid';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
    selector: 'app-single-t',
    templateUrl: './single-t.component.html',
    styleUrls: ['./single-t.component.css']
})
export class SingleTComponent implements OnInit {
    ordersForm !: FormGroup;

    user = new Users()      ;
    
    subjectU : Subject<Users> = new Subject()        ;

    table  = new Table();   menu : Menù[] = []       ;
    total_price = 0     ;  
    bar_time = 0        ; kitchen_time = 0           ;


    kitchen = false; bar = false;



    cart: Array<{ _id: String, element: String, amount: Number, kind: String, time: Number }> = [];
    num = this.route.snapshot.paramMap.get('number');


    constructor(private tableService: TableService, private menuService: MenùService,
        private route: ActivatedRoute, private userService: UserService,
        private ordersService: OrdersService, private formBuilder: FormBuilder,
        private toastrService: ToastrService, private socketIoService: SocketIoService,
        private router : Router) {

        let num = this.route.snapshot.paramMap.get('number');

        if (num) {
            let tableObservable = tableService.getTableByNumber(num).pipe(
                catchError((error)=>{
                    if(error instanceof HttpErrorResponse){
                        this.toastrService.error('You must log first');
                        this.router.navigateByUrl('/login');
                    }
                    return new Observable<Table>();
                
                }));

            tableObservable.subscribe((serverTable) => this.table = serverTable);
        }

        let userObservable: Observable<Users>;

        userObservable = userService.getIt() ;

        userObservable.subscribe((serverUser) => {
            this.subjectU.next(serverUser);
        });
        this.subjectU.subscribe((user) => this.user = user);
    }

    putInCart(menu : Menù){  
        this.total_price = +(this.total_price) + +(menu.price)
        if(menu.kind===Kind.coffe_bar||menu.kind===Kind.drinks){ 
            this.bar = true ;
            this.bar_time = +(this.bar_time)+ +(menu.preparation_time)
        }
        if(menu.kind===Kind.dishes||menu.kind===Kind.dessert){ 
            this.kitchen = true ;
            this.kitchen_time = +(this.kitchen_time)+ +(menu.preparation_time)
        }
        for(var i=0 ; i<this.cart.length; i++){
            if(menu.name===this.cart[i].element) {
                this.cart[i].amount = + this.cart[i].amount + + 1 ;
                return ;
            }
        }
        // quando implementi la insert nel menu devi ricordarti di autogenerarti l'id lato client
        this.cart.push({ _id: menu._id, element: menu.name, amount: 1, kind: menu.kind, time: menu.preparation_time })
    }

    order() {
        if (this.table.customers === 0) {
            this.toastrService.error('Customers must be major than zero.')
        }
        else if (!this.cart) {
            this.toastrService.error('Cart empty.')
        }
        else {
            if (this.num) {
                let numero = parseInt(this.num);

                let _id = uuid();

                this.ordersService.newOrder({_id : _id, waiter : this.user.username,
                    to_prepare : this.cart , total_price : this.total_price, bar_time : this.bar_time,
                    kitchen_time : this.kitchen_time ,date : new Date() }, numero ).subscribe();
  
                if(this.kitchen) this.socketIoService.send_k(this.user.username);
                if(this.bar)     this.socketIoService.send_b("spedito");
            }
        }
    }

    drinks() {
        let menuObservable = this.menuService.GetMenuByKind(Kind.drinks);

        menuObservable.subscribe((serverMenu) => this.menu = serverMenu);
    }

    dessert() {
        let menuObservable = this.menuService.GetMenuByKind(Kind.dessert);

        menuObservable.subscribe((serverMenu) => this.menu = serverMenu);
    }

    coffe() {
        let menuObservable = this.menuService.GetMenuByKind(Kind.coffe_bar);

        menuObservable.subscribe((serverMenu) => this.menu = serverMenu);
    }

    dishes() {
        let menuObservable = this.menuService.GetMenuByKind(Kind.dishes);

        menuObservable.subscribe((serverMenu) => this.menu = serverMenu);
    }

    submit(): void {
        if (this.ordersForm.invalid) return;
        if (this.num) this.tableService.updateTable(this.num, this.ordersForm.controls.customers.value).subscribe(() => location.reload());
    }

    ngOnInit(): void {
        this.ordersForm = this.formBuilder.group({
            customers: ['', [Validators.required]]
        })
    }
}