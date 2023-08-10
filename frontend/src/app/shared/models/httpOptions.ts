import { HttpHeaders } from '@angular/common/http';

export class HttpOptions {
    headers !: HttpHeaders;
    withCredentials: boolean = true;
    constructor() {
        let token: string | null = localStorage.getItem('Token');
        if (token !== null) {
            this.headers = new HttpHeaders({ 'authorization': token.toString()});
        }
        else {
            localStorage.setItem('Token', "");
        }
    }
}
