import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/shared/models/users';
import { Subject , Observable} from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateForm !: FormGroup  ;

  user = new Users() ;
  subject : Subject<Users> = new Subject();


  constructor(private http : HttpClient, private userService : UserService,
              private formBuilder : FormBuilder ) {
        let userObservable: Observable<Users>;

        userObservable = userService.getIt()  ;
        
        userObservable.subscribe((serverUser) => {
              this.subject.next(serverUser);
        });
        this.subject.subscribe((user)=>this.user = user);
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      role: ['', [Validators.required]]
  })
  }

  update(){
    if(this.updateForm.invalid) return ;
    this.userService.updateUser(this.user._id ,this.updateForm.controls.username.value, 
                                this.updateForm.controls.name.value, this.updateForm.controls.surname.value,
                                this.updateForm.controls.role.value,).subscribe()
  }
}
