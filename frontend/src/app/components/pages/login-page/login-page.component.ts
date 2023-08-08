import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/shared/models/users';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm !:  FormGroup ;
  isSubmitted = false     ;
  returnUrl   =  ''       ;

  
  constructor(private formBuilder: FormBuilder, private userService : UserService,
              private activatedRoute: ActivatedRoute, private router : Router) {}
  
  ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
         username : ['', [Validators.required]],
         password : ['', [Validators.required]]
     })

     this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl 
     // sanpshot means return the latest value of the activated route
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true ; 
    if(this.loginForm.invalid) return ;
    
    alert(`username : ${this.fc.username.value}`)
    this.userService.login({username:this.fc.username.value, password:this.fc.password.value}).subscribe((result: any)=>{ 
      localStorage.setItem('token', result);
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
