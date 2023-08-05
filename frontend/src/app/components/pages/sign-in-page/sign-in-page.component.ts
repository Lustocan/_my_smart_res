import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit{
   signInForm !: FormGroup ;
   isSubmitted = false      ;

   constructor ( private formBuilder : FormBuilder ) {}

  submit() : void {
    this.isSubmitted = true ;
    if(this.signInForm.invalid){
      return ;
    }
    alert("diomerda")
  }

  get fc(){
    return this.signInForm.controls;
  }
   
  ngOnInit(): void {
      this.signInForm = this.formBuilder.group({
          username: ['', [Validators.required]],
          name: ['', [Validators.required]],
          surname: ['', [Validators.required]],
          role: ['', [Validators.required]],
          password: ['', [Validators.required]]
      })
  }


}
