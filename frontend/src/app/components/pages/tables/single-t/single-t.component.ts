import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { ActivatedRoute } from '@angular/router';
import { MenùService } from 'src/app/services/menù.service';
import { Kind, Menù } from 'src/app/shared/models/menù';
import { OrdersService } from 'src/app/services/orders.service';
import { Users } from 'src/app/shared/models/users';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-single-t',
  templateUrl: './single-t.component.html',
  styleUrls: ['./single-t.component.css']
})
export class SingleTComponent implements OnInit{
  ordersForm !: FormGroup  ;

  user = new Users() ;
  subject : Subject<Users> = new Subject();
  num = this.route.snapshot.paramMap.get('number') ;

  table  = new Table(); 
  menu : Menù[] = []  ;

  total_price = 0. ;
  total_time  = 0. ;

  cart : Array<{element : String , amount : Number, kind : String}> = [] ;


  constructor(private tableService : TableService , private menuService : MenùService, 
              private route : ActivatedRoute , private userService : UserService,
              private ordersService : OrdersService, private formBuilder : FormBuilder ,
              private toastrService : ToastrService) {

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
      for(var i=0 ; i<this.cart.length; i++){
          if(menu.name===this.cart[i].element) {
             this.cart[i].amount = + this.cart[i].amount + + 1 ;
             return ;
          }
      }
      this.cart.push({element : menu.name, amount : 1, kind : menu.kind})
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
    if(this.signInForm.invalid) return ;
    
    this.userService.sign_in({username:this.fc.username.value,
                              name : this.fc.name.value, surname: this.fc.surname.value, 
                              role: this.fc.role.value , password:this.fc.password.value}).subscribe(()=> {
                                  this.router.navigateByUrl("/login")
     });*/

  submit() : void {
     if(this.ordersForm.invalid) return ;
     if(this.num) this.tableService.updateTable(this.num, this.ordersForm.controls.customers.value).subscribe()
  }

 order() {
  if(this.table.customers===0){
    this.toastrService.error('Customers must be major than zero.')	
  }
  else if(!this.cart){
    this.toastrService.error('Cart empty.')	
  }
  else{
        if(this.num){
          let numero = parseInt(this.num);
          this.ordersService.newOrder({ waiter : this.user.username,
          to_prepare : this.cart , total_price : this.total_price , total_time : this.total_time}, numero ).subscribe() ;
        }
    }
  }
  
  ngOnInit() : void {
      this.ordersForm = this.formBuilder.group({
         customers : ['', [Validators.required]]
      })
  }
}
