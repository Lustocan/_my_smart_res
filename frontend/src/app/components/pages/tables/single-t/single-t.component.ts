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
import {  FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuid } from 'uuid';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
    selector: 'app-single-t',
    templateUrl: './single-t.component.html',
    styleUrls: ['./single-t.component.css']
})
export class SingleTComponent implements OnInit {

    user = new Users()      ;

    table  = new Table();   menu : Menù[] = []       ;
    counter = 0         ;   bar = false              ;
    bar_time = 0        ;   kitchen_time = 0         ;
    kitchen  = false    ;   num : any                ;

    cart: Array<{ _id: String, element: String, amount: Number, price : Number, kind: String, time: Number }> = [];


    constructor(private tableService: TableService, private menuService: MenùService,
                private route: ActivatedRoute, private userService: UserService,
                private ordersService: OrdersService, private formBuilder: FormBuilder,
                private toastrService: ToastrService, private socketIoService: SocketIoService,
                private router : Router) {

                this.num = this.route.snapshot.paramMap.get('number');
    }

    ngOnInit(): void {
        this.getTable() ;
        this.getMe()    ;  
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
        menuObservable.subscribe((serverMenu) => this.menu = serverMenu) ;
    }

    is_drink(){
        if(this.menu.length>0) return this.menu[0].kind === Kind.drinks ;
        return false ;
    }

    is_dish(){
        if(this.menu.length>0) return this.menu[0].kind === Kind.dishes ;
        return false ;
    }

    is_coffe(){
        if(this.menu.length>0) return this.menu[0].kind === Kind.coffe_bar ;
        return false ;
    }

    is_dessert(){
        if(this.menu.length>0) return this.menu[0].kind === Kind.dessert ;
        return false ;
    }

    increment(){
        this.counter += 1 ;
        if(this.counter==(+this.table.seats+ + 1)) this.counter = +this.table.seats+ + +0;
    }

    decrement(){
        this.counter -= 1 ;
        if(this.counter===-1) this.counter = 0 ;
    }

    getMe(){
        this.userService.getIt().subscribe((serverUser) => {
            this.user = serverUser
        });
    }

    getTable(){
        if (this.num) {
            let tableObservable = this.tableService.getTableByNumber(this.num).pipe(
                catchError((error)=>{
                    if(error instanceof HttpErrorResponse){
                        this.toastrService.error('Login required');
                        this.router.navigateByUrl('/login');
                    }
                    return new Observable<Table>();
                
                }));
                tableObservable.subscribe((serverTable) => this.table = serverTable);
        }
    }

    putInCart(menu : Menù){  
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
        this.cart.push({ _id: menu._id, element: menu.name, amount: 1, price : menu.price, kind: menu.kind, time: menu.preparation_time })
    }

    order() {
        if (!this.cart) {
            this.toastrService.error('Cart empty.')
        }
        else if(this.counter===0&&this.table.customers===0){
            this.toastrService.error('Customers must be major than zero.')
        }
        else if(this.num) {

            let numero = parseInt(this.num);

            if(this.table.customers===0) this.tableService.updateTable(this.num , this.counter).subscribe();

            let _id = uuid();

            let el = Array<{username : String, role : String }>();
            el.push({username : this.user.username, role :  this.user.role })

            this.ordersService.newOrder({_id : _id, staff : el, 
                to_prepare : this.cart , bar_time : this.bar_time,
                kitchen_time : this.kitchen_time ,date : new Date() }, numero ).subscribe();
  
            if(this.kitchen) this.socketIoService.send_k(this.user.username);
            if(this.bar)     this.socketIoService.send_b("spedito");

            setTimeout(function(){
                location.reload();
            }, 1500)
        }
    }
}