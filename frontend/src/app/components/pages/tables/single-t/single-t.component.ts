import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { ActivatedRoute } from '@angular/router';
import { MenùService } from 'src/app/services/menù.service';
import { Kind, Menù } from 'src/app/shared/models/menù';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/models/users';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-single-t',
  templateUrl: './single-t.component.html',
  styleUrls: ['./single-t.component.css']
})
export class SingleTComponent implements OnInit{
  user = new Users() ;
  subject : Subject<Users> = new Subject();

  table  = new Table(); 
  menu : Menù[] = []  ;

  total_price = 0. ;
  total_time  = 0. ;

  ca : Array<{element : String , amount : Number, kind : String}> = [] ;


  constructor(private tableService : TableService , private menuService : MenùService, 
              private route : ActivatedRoute , private userService : UserService,
              private ordersService : OrdersService ) {

      let num = this.route.snapshot.paramMap.get('number') ;

      if(num){  
          let tableObservable = tableService.getTableByNumber(num) ;

          tableObservable.subscribe((serverTable)=> this.table = serverTable); 
      }    

      let userObservable: Observable<Users>;

            userObservable = userService.getIt()  ;
            
            userObservable.subscribe((serverUser) => {
                  this.subject.next(serverUser);
            });
            this.subject.subscribe((user)=>this.user = user);
  }

  putInCart(menu : Menù){
      this.total_price = +(this.total_price) + +(menu.price)
      this.total_time = +(this.total_time) + +(menu.preparation_time)
      for(var i=0 ; i<this.ca.length; i++){
          if(menu.name===this.ca[i].element) {
            this.ca[i].amount = + this.ca[i].amount + + 1 ;
            return ;
          }
      }
      this.ca.push({element : menu.name, amount : 1, kind : menu.kind})
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

 order() {
    let num = this.route.snapshot.paramMap.get('number') ;
    if(num){
      let numero = parseInt(num);
      this.ordersService.newOrder({ waiter : this.user.username,
      to_prepare : this.ca , total_price : this.total_price , total_time : this.total_time}, numero ).subscribe() ;
    }
  }


  
  ngOnInit() : void {
  }
}
