import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/users'
import { usersService } from 'src/app/services/users.service'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users : Users[] = [] ;
  constructor(private usersService:usersService, activatedRoute : ActivatedRoute ) {
    let usersObservable : Observable<Users[]>
    activatedRoute.params.subscribe(params => {
       if(params.searchTerm){
           //usersObservable = this.usersService.getAllUsersBySearchTerm(params.searchTerm) ;
       }
       else{
           usersObservable =  usersService.getAll() ;  
       }
       usersObservable.subscribe((serverUsers) =>{
           this.users = serverUsers ;
       })
    }) 
  }
  
  ngOnInit(): void {    
  }
}
