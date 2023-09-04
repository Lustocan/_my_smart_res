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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    user = new Users()      ;

    table  = new Table();   menu : Menù[] = []       ;


    constructor(private tableService: TableService, private menuService: MenùService,
                private route: ActivatedRoute, private userService: UserService,
                private ordersService: OrdersService, private formBuilder: FormBuilder,
                private toastrService: ToastrService, private socketIoService: SocketIoService,
                private router : Router) {
    }

    ngOnInit(): void {
        this.getMe()    ;  
    }

    deleteEl(menù : Menù){
		this.menuService.deleteElement(menù).subscribe();
	}

    drinks() {
        let menuObservable = this.menuService.GetMenuByKind(Kind.drinks);
        menuObservable.pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    if(error.status===401){
                        this.toastrService.error('Login required');
                        this.router.navigateByUrl('/login');
                    }
                    else if(error.status===403){
                        this.toastrService.error('Unauthorized');
                        this.router.navigateByUrl('/');
                    }
                }
                return new Observable<Menù[]>();
            })).subscribe((serverMenu) => this.menu = serverMenu);
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

    getMe(){
        this.userService.getIt().subscribe((serverUser) => {
            this.user = serverUser
        });
    }
}
