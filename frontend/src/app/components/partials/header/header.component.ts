import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showMe:boolean = false ;
  
  ngOnInit(): void {
      
  }

  toogleTag(){
    this.showMe= (!this.showMe) ;
  }
}
