import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
	el : any ;
    constructor(private socket: Socket, private toastrService : ToastrService, private userService : UserService) { }

    // emit event
    send_k(elem : String) {
        this.socket.emit('kitchen', elem);
    } 

    // listen event
    receive_k() {
        this.socket.on('kitchen', (message:any) => {
            if(message){
                this.toastrService.warning('New order received');
            }
            setTimeout(function(){
                location.reload();
              }, 1500)
        })
    }

    send_b(elem : String) {
        this.socket.emit('bar', elem);
    } 

    // listen event
    receive_b() {
        this.socket.on('bar', (message:any) => {
            if(message){
                this.toastrService.warning('New order received' );
            }
            setTimeout(function(){
                location.reload();
            }, 1500)
        })
    }

    send_w(elem : {username : String, use : String}) {
        this.socket.emit('tables', elem);
    } 

    // listen event
    receive_w() {
        this.socket.on('tables', (arg:any) => {
            this.userService.getIt().subscribe((serverUser) => {
                if(arg.username===serverUser.username) {
                    if(arg.use==="bar") this.toastrService.warning('There are some drinks ready in the bar.' );
                    else if(arg.use==="kitchen") this.toastrService.warning('There are some dishes ready in the kitchen.' );
                }
          })     
        })
    }
}
