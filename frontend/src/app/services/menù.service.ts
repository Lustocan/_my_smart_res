import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kind, Menù } from '../shared/models/menù';
import { Observable } from 'rxjs';
import { MENU_URL } from '../shared/constants/urls';
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

	

}
