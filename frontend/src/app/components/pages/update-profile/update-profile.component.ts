import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Users } from 'src/app/shared/models/users';
import { Subject , Observable, catchError} from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateForm !: FormGroup  ;

  user = new Users() ;


  constructor(private http : HttpClient, private userService : UserService,
              private formBuilder : FormBuilder, private toastrService : ToastrService,
              private router : Router ) {

              this.updateForm = this.formBuilder.group({
                  username: ['', [Validators.required]],
                  name: ['', [Validators.required]],
                  surname: ['', [Validators.required]],
                  role: ['', [Validators.required]]
              })
  }

  ngOnInit(): void {
      this.userService.getIt().pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            this.toastrService.error('You must log first');
            this.router.navigateByUrl('/login');
          }
          return new Observable<Users>()})

      ).subscribe((serverUser) => {
          this.user = serverUser ;
      })
  }

  update(){
    if(this.updateForm.invalid) return ;
    this.userService.updateUser(this.user._id ,this.updateForm.controls.username.value, 
                                this.updateForm.controls.name.value, this.updateForm.controls.surname.value,
                                this.updateForm.controls.role.value,).subscribe()
  }
}
