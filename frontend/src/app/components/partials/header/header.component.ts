import { Component, OnInit } from '@angular/core';
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
      user      = new Users()  ;
      el        : any  ;
      userData  : any  ;

      showBar   : boolean = false  ;
      showLog   : boolean = true   ;

      constructor(private http : HttpClient, private userService : UserService) {
            let userObservable: Observable<Users>;

            userObservable = this.getIt()  ;
            
            userObservable.subscribe((serverUser) => {
                  this.user = serverUser ;
            })

            setTimeout(() => 
            {
                  console.log(this.user.role)
            },
            1000);

            

      }
      
      ngOnInit(): void { 
            this.getUser();

      }

      logout(){
            this.userService.logout();
      }

      toogleTag(){
            this.showBar= (!this.showBar) ;
      }

      getIt() : Observable<Users> {
            let http = new HttpOptions();
            return this.http.get<Users>(USER_URL, http) ;
      }

      getUser(){
            const http = new HttpOptions();
            this.showLog = true ;
            return this.http.get<Users>(USER_URL, http).pipe(catchError(()=>{
                this.showLog = false ;
                return new Observable<Users>;
            })).subscribe()
      }

}
