import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MenùService } from 'src/app/services/menù.service';
import { Kind, Menù } from 'src/app/shared/models/menù';

@Component({
  selector: 'app-single-t',
  templateUrl: './single-t.component.html',
  styleUrls: ['./single-t.component.css']
})
export class SingleTComponent implements OnInit{
  table  = new Table(); 
  menu : Menù[] = []  ;

  cart   : Menù[] = []  ;
  n_cart : Number[] = []  ;

  constructor(tableService : TableService , menuService : MenùService, private route : ActivatedRoute) {

      let num = this.route.snapshot.paramMap.get('number') ;

      if(num){  
          let tableObservable = tableService.getTableByNumber(num) ;

          tableObservable.subscribe((serverTable)=> this.table = serverTable); 
      }
      let menuObservable = menuService.GetMenuByKind(Kind.dishes) ;
      
      menuObservable.subscribe((serverMenu)=> this.menu = serverMenu);     
  }

  putInCart(menu : Menù){
    for(var i=0 ; ((i<this.cart.length)&&(i<this.n_cart.length)); i++){
        if(menu.name===this.cart[i].name) {
          this.n_cart[i] = +this.n_cart[i] + +1  ;
          return ;
        }
    }
    this.cart.push(menu) ;
    this.n_cart.push(1) ;
  }
  
  ngOnInit() : void {}
}
