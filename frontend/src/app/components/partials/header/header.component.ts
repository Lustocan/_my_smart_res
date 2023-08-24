import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Users } from 'src/app/shared/models/users';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
      user = new Users() ;

      showBar : Boolean = false    ;
      showLog : Boolean = true  ;

      constructor(private http : HttpClient, private userService : UserService,
                  private socketIoService : SocketIoService, private router : Router ) {}
      
      ngOnInit(): void { 
            this.getUser()        ;
            this.activeSocket()   ;
      }


      toogleTag(){
            this.showBar= (!this.showBar) ;
      }

      nobody(){
            return !this.user.role ?  true : false ;
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
            return this.user.role === 'bartender' ?  true : false ;
      }

      logout(){
            sessionStorage.removeItem("my-role")
            this.userService.logout();
      }


      getUser(){
            this.userService.getIt().pipe(catchError((error)=>{
                  this.showLog = false ;
                        return new Observable<Users>;
                    })).subscribe((serverUser) => {
                        this.user = serverUser ;
            })      
      }

      activeSocket(){
            if(this.user.role==="cook"){
                  this.socketIoService.receive_k();    
            }
            else if(this.user.role==="waiter"){
                  this.socketIoService.receive_w();   
            }
            else if(this.user.role==="bartender"){
                  this.socketIoService.receive_b();   
            }
      }
}
