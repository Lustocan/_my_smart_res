import { HttpHeaders } from '@angular/common/http';
import { TOKEN } from '../constants/Storage_name';

//options for http request

export class HttpOptions {
    headers !: HttpHeaders;
    withCredentials: boolean = true;   // send to the server the session cookie
    constructor() {
        let token: string | null = localStorage.getItem('Token');
        if (token !== null) {
            this.headers = new HttpHeaders({ 'authorization': token.toString()}); // session token
        }
        else {
            localStorage.setItem(TOKEN, "");
        }
    }
}
