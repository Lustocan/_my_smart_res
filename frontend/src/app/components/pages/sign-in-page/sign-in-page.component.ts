import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit{
    signInForm !: FormGroup  ;
    isSubmitted = false      ;
    selectedValue: string = '';

    constructor(private formBuilder: FormBuilder, private userService : UserService,
                private activatedRoute: ActivatedRoute, private router : Router) {
               
               this.signInForm = this.formBuilder.group({
                 username: ['', [Validators.required]],
                 name: ['', [Validators.required]],
                 surname: ['', [Validators.required]],
                 role: ['', [Validators.required]],
                 password: ['', [Validators.required]],
               })
    }


    ngOnInit(): void {} 

    get fc(){
       return this.signInForm.controls;
    }


    submit() : void {
       this.isSubmitted = true ;
           if(this.signInForm.invalid) return ;
           this.userService.sign_in({username:this.fc.username.value,
                                     name : this.fc.name.value, surname: this.fc.surname.value, 
                                     role: this.fc.role.value , password:this.fc.password.value}).subscribe(()=> {
                                     this.router.navigateByUrl("/login")
        });
    }

   
}
