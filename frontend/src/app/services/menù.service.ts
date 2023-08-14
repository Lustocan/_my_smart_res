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

	addNewElement(name:String, kind: Kind, price: string) : Observable<Menù>{
		return this.http.post<Menù>(ADD_MENU_URL,{name:name,kind:kind,price:price},this.httpOptions);
	}

	updateElement(id:String, name:String, kind: Kind, price:String) : Observable<Menù>{
		return this.http.patch<Menù>(MENU_URL+'/'+id+'/update',{name:name,kind:kind,price:price},this.httpOptions);
	}


	
	deleteElement(id:String){
		return this.http.delete<Menù>(MENU_URL+'/'+id+'/delete',this.httpOptions);	
	}
}
