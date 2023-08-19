import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
	el : any ;
    constructor(private socket: Socket) { }

    // emit event
    fetch(elem : Number) {
        this.socket.emit('cook', elem);
    } 

    // listen event
    onFetch() {
		return this.el= new Observable((observer: Observer<any>) => {
			this.socket.on('cook', (message:any) => {
				observer.next(message)});
		});
    }
}
