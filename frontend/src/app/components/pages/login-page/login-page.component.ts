import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm !:  FormGroup ;
  isSubmitted = false     ;
  
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
         username : ['', [Validators.required]],
         password : ['', [Validators.required]]
     })
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true ; 
    if(this.loginForm.invalid) return ;
    
    alert(`username : ${this.fc.username.value}`)
  }
}
