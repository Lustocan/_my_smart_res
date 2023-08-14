import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError, retry, Subject } from 'rxjs';
import { HttpOptions } from 'src/app/shared/models/httpOptions';
import { Users } from 'src/app/shared/models/users';
import { USERS_URL, USER_URL } from 'src/app/shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
      user = new Users() ;
      subject : Subject<Users> = new Subject();
      el        : any  ;
      userData  : any  ;

      showBar   : boolean = false  ;
      showLog   : boolean = true   ;

      constructor(private http : HttpClient, private userService : UserService) {
            let userObservable: Observable<Users>;

            userObservable = userService.getIt()  ;
            
            userObservable.subscribe((serverUser) => {
                  this.subject.next(serverUser);
            });
            this.subject.subscribe((user)=>this.user = user);
      }
      
      ngOnInit(): void { 
            this.getUser();
      }

      waiter(){
            return this.user.role === 'waiter' ?  true : false ;
      }

      casher(){
            return this.user.role === 'casher' ?  true : false ;
      }

      cook(){
            return this.user.role === 'cook' ?  true : false ;
      }

      bartender(){
            return this.user.role === 'bartenderw' ?  true : false ;
      }

      nobody(){
            return !this.user.role ?  true : false ;
      }

      logout(){
            this.userService.logout();
      }

      toogleTag(){
            this.showBar= (!this.showBar) ;
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
