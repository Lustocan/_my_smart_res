import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/shared/models/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketIoService } from 'src/app/services/socket.io.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})

// TODO -> sistemare il placeholder di customers, quando lo schermo si rimpicciolisce i 4 bottoni si sminchiano
//         fare in modo che per sendare un ordine bisogna aver fillato i customers

export class TablesComponent implements OnInit{
    tables : Table[] = [] ;

    constructor(private tableService : TableService, private router : Router) { 
        let tableObservable = tableService.getAll() ;

        tableObservable.subscribe((serverTable)=> this.tables = serverTable); 
    }

    ngOnInit() : void { }

    submitDelete(number : Number){
        this.tableService.deleteTable(number).subscribe(()=> {
                  this.router.navigateByUrl('/tables').then(() => {
                    setTimeout(function(){
                      location.reload();
                    }, 1500
        )})
      });
    }
}
