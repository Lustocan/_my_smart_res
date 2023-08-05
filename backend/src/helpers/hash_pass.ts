// Here we are going to use authentication helpers which are going to help us
// either to encrypt the password or to create a random token

import crypto from 'crypto' ;

const SECRET = 'MATTEO-REST-API';

export const random = () => crypto.randomBytes(128).toString('base64');

// the algorythms that we use for encrypt the data is sha256
export const authentication = (salt : string, password : string) => {
    return crypto.createHmac('sha256', [salt, password].join('/'))
                                                       .update(SECRET) // updating data
                                                       .digest('hex')  // encoding to be used
}