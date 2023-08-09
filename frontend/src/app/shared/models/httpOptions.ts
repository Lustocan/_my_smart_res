import { HttpHeaders } from '@angular/common/http';

export class HttpOptions {
    headers !: HttpHeaders ;
    withCredentials: boolean = true;
    constructor(){
        let token : string | null = localStorage.getItem('User');
        if(token != null){
           this.headers = new HttpHeaders({'authorization': token.toString()});
        }
        else{
            throw new Error("No token in the localStorage");    
        }
    }
}
