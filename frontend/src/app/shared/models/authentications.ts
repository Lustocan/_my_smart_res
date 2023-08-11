//probably useless

let auth: boolean = false;
export function isAuthenticated(){
    return auth;
}

export function setAuthentication(value : boolean){
    auth = value;
}