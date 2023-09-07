import express from 'express'                                                 ;
import { login, sign_in, logout  } from '../controllers/users_utilities'      ;

export default (router : express.Router) => {
    router.post('/auth/sign_in', sign_in)                                     ;
    router.post('/auth/login', login)                                         ;
    router.post('/auth/:id/logout',logout)                                    ;
}