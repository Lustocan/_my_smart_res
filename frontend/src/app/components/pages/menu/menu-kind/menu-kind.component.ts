import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuid } from 'uuid';
import { MenùService } from 'src/app/services/menù.service';
import { Kind, Menù } from 'src/app/shared/models/menù';

@Component({
  selector: 'app-menu-kind',
  templateUrl: './menu-kind.component.html',
  styleUrls: ['./menu-kind.component.css']
})
export class MenuKindComponent implements OnInit {
	menuForm !: FormGroup;
	isSubmitted = false;
    returnUrl = "" ;
	cur_kind ;


	constructor(private formBuilder: FormBuilder, private menuService: MenùService,
	        	private route: ActivatedRoute, private router: Router) {
				
				this.menuForm = this.formBuilder.group({
					 name: ['', [Validators.required]],
					 price: ['', [Validators.required]],
                     preparation_time: ['', [Validators.required]]
				})

        this.cur_kind = this.route.snapshot.paramMap.get('kind');
	}

	ngOnInit(): void {}

	get fc() {
		return this.menuForm.controls;
	}

	submit() {
		this.isSubmitted = true;
		if (this.menuForm.invalid) return;

        let _id = uuid();

		this.menuService.addNewElement({_id : _id , name: this.fc.name.value  , kind : Kind.dishes , price : this.fc.price.value, 
                                    preparation_time : this.fc.preparation_time.value }, this.cur_kind||"")
                                    .subscribe((result: any) => {

		    this.router.navigateByUrl(this.returnUrl).then(() => {
				setTimeout(function(){
					location.reload();
				}, 1500
			)});
		});
	}
}
