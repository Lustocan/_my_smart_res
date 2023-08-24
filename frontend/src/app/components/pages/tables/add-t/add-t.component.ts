import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/shared/models/table';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';


// TODO , dopo l'add table non fa il redirect

@Component({
	selector: 'app-add-t',
	templateUrl: './add-t.component.html',
	styleUrls: ['./add-t.component.css']
})
export class AddTComponent implements OnInit {

	tableForm !: FormGroup;
	isSubmitted = false;

	constructor(private formBuilder: FormBuilder, private tableService: TableService,
		private activatedRoute: ActivatedRoute, private router: Router, 
		private userService : UserService, private toastrService: ToastrService) {

		this.tableForm = this.formBuilder.group({
			number: ['', [Validators.required]],
			seats: ['', [Validators.required]]
		})
	}

	ngOnInit(): void {
		this.getMe() ;
	}

	get fc() {
		return this.tableForm.controls;
	}

	getMe(){
		this.userService.getIt().pipe(
			catchError((error)=>{
				if(error instanceof HttpErrorResponse){
					this.toastrService.error('Login required');
					this.router.navigateByUrl('/login');
				}
				return new Observable<Table>();
			})
		).subscribe();
	}

	submit() {
		this.isSubmitted = true;
		if (this.tableForm.invalid) {
			return;
		}

		this.tableService.buildTable({
			number: this.fc.number.value,
			seats: this.fc.seats.value
		}).subscribe(() => {
			this.router.navigateByUrl('/tables');
		});
	}
}
