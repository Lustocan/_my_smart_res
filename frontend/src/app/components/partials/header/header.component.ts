import { Component, OnInit } from '@angular/core';
import { TOKEN } from 'src/app/shared/constants/Storage_name';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { HttpOptions } from 'src/app/shared/models/httpOptions';
import { Users } from 'src/app/shared/models/users';
import { USERS_URL, USER_URL } from 'src/app/shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { UserService, } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showBar:boolean = false  ;
  showLog:boolean = true  ;
  

  constructor(private http : HttpClient, private userService : UserService) { }
  
  ngOnInit(): void { 
    this.getUser();
  }

  refresh(){
    window.location.reload();
  }



  getUser(){
    const http = new HttpOptions();
    this.showLog = true ;
    this.http.get<Users>(USER_URL, http).pipe(catchError((error)=>{
        this.showLog = false ;
        return new Observable<Users>;
    })).subscribe()
  }

  toogleTag(){
    this.showBar= (!this.showBar) ;
  }

  logout(){
    this.userService.logout();
  }

}
