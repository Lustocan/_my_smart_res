import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kind, Menù } from '../shared/models/menù';
import { Observable } from 'rxjs';
import { ADD_MENU_URL, MENU_URL } from '../shared/constants/urls';
import { HttpOptions } from '../shared/models/httpOptions';

@Injectable({
	providedIn: 'root'
})
export class MenùService {
	private httpOptions = new HttpOptions();

	constructor(private http: HttpClient) { }
	
	GetMenuByKind(kind: Kind) : Observable<Menù[]>{
		return this.http.get<Menù[]>(MENU_URL+'/'+kind,this.httpOptions);
	}

	addNewElement(menù: Menù) : Observable<Menù>{
		return this.http.post<Menù>(ADD_MENU_URL,menù,this.httpOptions);
	}

	updateElement(id:string,menù: Menù) : Observable<Menù>{
		return this.http.patch<Menù>(MENU_URL+'/'+id+'/update',menù,this.httpOptions);
	}


	deleteElement(menù: Menù){
		return this.http.delete<Menù>(MENU_URL+'/'+menù._id+'/delete',this.httpOptions);	
	}
}
