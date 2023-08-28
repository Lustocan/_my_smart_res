import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kind, Menù } from '../shared/models/menù';
import { Observable, tap } from 'rxjs';
import {  MENU_URL } from '../shared/constants/urls';
import { HttpOptions } from '../shared/models/httpOptions';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class MenùService {
	private httpOptions = new HttpOptions();

	constructor(private http: HttpClient, private toastrService: ToastrService) { }
	
	GetMenuByKind(kind: Kind) : Observable<Menù[]>{
		return this.http.get<Menù[]>(MENU_URL+'/'+kind,this.httpOptions);
	}

	addNewElement(menù: Menù, kind : String) : Observable<Menù>{
		return this.http.post<Menù>(MENU_URL+'/'+kind ,menù,this.httpOptions).pipe(
			tap({
				next: (menu) => { 
					this.toastrService.success('Element successfully added');
					setTimeout(function(){
						location.reload();
					}, 1500)
				},
				error: (errorResponse) => {
					this.toastrService.error('Add element failed');
				}
			}));
	}

	updateElement(id:string,menù: Menù) : Observable<Menù>{
		return this.http.patch<Menù>(MENU_URL+'/'+id+'/update',menù,this.httpOptions).pipe(
			tap({
				next: (menu) => { 
					this.toastrService.success('Menù successfully updated');
				},
				error: (errorResponse) => {
					this.toastrService.error('Update menù failed');
				}
			}));
	}


	deleteElement(menù: Menù){
		return this.http.delete<Menù>(MENU_URL+'/'+menù._id+'/delete',this.httpOptions).pipe(
			tap({
				next: (menu) => { 
					this.toastrService.success('Menù successfully deleted');
					setTimeout(function(){
						location.reload();
					}, 1500)
				},
				error: (errorResponse) => {
					this.toastrService.error('Delete menù failed');
				}
			}));;	
	}
}
