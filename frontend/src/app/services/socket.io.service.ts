import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
	el : any ;
    constructor(private socket: Socket, private toastrService : ToastrService) { }

    // emit event
    send_k(elem : String) {
        this.socket.emit('kitchen', elem);
    } 

    // listen event
    receive_k() {
		/*return this.el= new Observable((observer: Observer<any>) => {
			this.socket.on('kitchen', (message:any) => {
				observer.next(message)})
		});*/
        this.socket.on('kitchen', (message:any) => {
            if(message){
                this.toastrService.warning('New order received');
            }
        })
    }

    send_b(elem : String) {
        this.socket.emit('bar', elem);
    } 

    // listen event
    receive_b() {
		/*return this.el= new Observable((observer: Observer<any>) => {
			this.socket.on('kitchen', (message:any) => {
				observer.next(message)})
		});*/
        this.socket.on('bar', (message:any) => {
            if(message){
                this.toastrService.warning('New order received' );
            }
        })
    }

    send_w(elem : String) {
        this.socket.emit('tables', elem);
    } 

    // listen event
    receive_w() {
        this.socket.on('tables', (message:any) => {
            if(message){
                this.toastrService.warning('There is some dishes ready in the kitchen.' );
            }
        })
    }
}
