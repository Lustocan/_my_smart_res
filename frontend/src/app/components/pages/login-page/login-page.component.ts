import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
	loginForm !: FormGroup;
	isSubmitted = false;
	returnUrl = '';

	constructor(private formBuilder: FormBuilder, private userService: UserService,
	        	private activatedRoute: ActivatedRoute, private router: Router) {
				
				this.loginForm = this.formBuilder.group({
					 username: ['', [Validators.required]],
					 password: ['', [Validators.required]]
				})
	}

	ngOnInit(): void {}

	get fc() {
		return this.loginForm.controls;
	}

	submit() {
		this.isSubmitted = true;
		if (this.loginForm.invalid) return;

		this.userService.login({ username: this.fc.username.value, password: this.fc.password.value }).subscribe((result: any) => {
		    this.router.navigateByUrl(this.returnUrl).then(() => {
				setTimeout(function(){
					location.reload();
				}, 1500
			)});
		});
	}
}
