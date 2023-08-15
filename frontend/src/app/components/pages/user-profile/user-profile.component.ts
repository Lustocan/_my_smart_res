import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/shared/models/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
    user = new Users() ;

    constructor(userService : UserService){
        let userObservable: Observable<Users>;

        userObservable = userService.getIt()  ;
        
        userObservable.subscribe((serverUser)=> this.user = serverUser);

    }

	  ngOnInit(): void {
	  }
}
