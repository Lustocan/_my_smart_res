import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})

export class TablesComponent implements OnInit{
    tables : Table[] = [] ;

    constructor(private tableService : TableService, private router : Router) { 
        let tableObservable = tableService.getAll() ;

        tableObservable.subscribe((serverTable)=> this.tables = serverTable); 
    }

    ngOnInit() : void { }

    submitDelete(number : String){
        this.tableService.deleteTable(number).subscribe(()=> {
                  this.router.navigateByUrl('/tables');
      });
    }
}
