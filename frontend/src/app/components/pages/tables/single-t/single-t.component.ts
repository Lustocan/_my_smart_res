import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MenùService } from 'src/app/services/menù.service';
import { Kind, Menù } from 'src/app/shared/models/menù';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-t',
  templateUrl: './single-t.component.html',
  styleUrls: ['./single-t.component.css']
})
export class SingleTComponent implements OnInit{
  OrderForm !: FormGroup  ;

  table  = new Table(); 
  menu : Menù[] = []  ;

  cart   : Menù[] = []  ;
  n_cart : Number[] = []  ;


  total_price = 0. ;
  total_time  = 0. ;


  constructor(private tableService : TableService , private menuService : MenùService, 
              private route : ActivatedRoute , private formBuilder : FormBuilder,
              private ordersService : OrdersService, private router : Router ) {

      let num = this.route.snapshot.paramMap.get('number') ;

      if(num){  
          let tableObservable = tableService.getTableByNumber(num) ;

          tableObservable.subscribe((serverTable)=> this.table = serverTable); 
      }    
  }

  putInCart(menu : Menù){
      this.total_price = +(this.total_price) + +(menu.price)
      this.total_time = +(this.total_time) + +(menu.prepare_time)
      for(var i=0 ; i<this.cart.length; i++){
          if(menu.name===this.cart[i].name) {
            this.n_cart[i] = +this.n_cart[i] + +1  ;
            return ;
          }
      }
      this.cart.push(menu) ;
      this.n_cart.push(1) ;
  }

  drinks(){
      let menuObservable = this.menuService.GetMenuByKind(Kind.drinks) ;   
      
      menuObservable.subscribe((serverMenu)=> this.menu = serverMenu); 
  }

  dishes(){
      let menuObservable = this.menuService.GetMenuByKind(Kind.dishes) ;   
      
      menuObservable.subscribe((serverMenu)=> this.menu = serverMenu); 
  }

  dessert(){
      let menuObservable = this.menuService.GetMenuByKind(Kind.dessert) ;   
      
      menuObservable.subscribe((serverMenu)=> this.menu = serverMenu); 
  }

  coffe(){
      let menuObservable = this.menuService.GetMenuByKind(Kind.coffe_bar) ;   
      
      menuObservable.subscribe((serverMenu)=> this.menu = serverMenu); 
  }

  /*submit() : void {
    this.isSubmitted = true ;
    if(this.signInForm.invalid){
      return ;
    }
    
    this.userService.sign_in({username:this.fc.username.value,
                              name : this.fc.name.value, surname: this.fc.surname.value, 
                              role: this.fc.role.value , password:this.fc.password.value}).subscribe(()=> {
                                  this.router.navigateByUrl("/login")
     });*/

 /* order() {
    for(var i=0 ; i<this.cart.length; i++){
        this.ca.push({element : this.cart[i].name, amount : this.n_cart[i]})
    }
    this.ordersService.newOrder({ waiter : "Lustocan",
      to_prepare : this.ca , total_price : this.total_price , total_time : this.total_time},  this.route.snapshot.paramMap.get('number') ).subscribe(()=> {
          this.router.navigateByUrl("/login")
    });
  }*/


  
  ngOnInit() : void {
  }
}
