import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '../shared/models/httpOptions';
import { Queue } from '../shared/models/queue';
import { Observable } from 'rxjs';
import { QUEUE_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class QueueService {

	httpOptions : HttpOptions = new HttpOptions();

	constructor(private http: HttpClient, private toastrService : ToastrService ) { }

	newQueue(queue : Queue) : Observable<Queue>{
		return this.http.post<Queue>(QUEUE_URL , queue, this.httpOptions) ;
	}

	getAllQueues() : Observable<Queue[]>{
		return this.http.get<Queue[]>(QUEUE_URL,this.httpOptions);
	}

}
