import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/shared/models/table';

@Component({
  selector: 'app-add-t',
  templateUrl: './add-t.component.html',
  styleUrls: ['./add-t.component.css']
})
export class AddTComponent implements OnInit {

  tableForm !: FormGroup;
	isSubmitted = false;
	returnUrl = '';

  constructor(private formBuilder: FormBuilder, private tableService: TableService,
              private activatedRoute: ActivatedRoute, private router: Router){ }

  submit() {
    this.isSubmitted = true ;
    if(this.tableForm.invalid){
       return ;
    }
    
    this.tableService.buildTable({number :this.fc.number.value,
                                  seats : this.fc.seats.value}).subscribe(()=> {
                                          this.router.navigateByUrl(this.returnUrl)
     });
	}

  get fc() {
		return this.tableForm.controls;
	}

  ngOnInit(): void {
    this.tableForm = this.formBuilder.group({
			number: ['', [Validators.required]],
			seats: ['', [Validators.required]]
		})
  }

}
