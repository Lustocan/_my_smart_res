import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'src/app/shared/models/table';
import { Observable, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent  {}