import { Component } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-t',
  templateUrl: './single-t.component.html',
  styleUrls: ['./single-t.component.css']
})
export class SingleTComponent {
  table = new Table(2,2) ;

    constructor(tableService : TableService){
        let tableObservable: Observable<Table>;

        tableObservable = tableService.getTableByNumber()  ;
        
     tableObservable.subscribe((serverUser)=> this.table = serverUser);

    }

}
