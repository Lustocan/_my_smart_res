import express from 'express';
import authentication from './authentication'
import users from './users'
import tables from './tables'
import menu from './menu'
import orders from './orders'
import bills from './bills';

// This function return a new router object
const router = express.Router();

export default () : express.Router => {
    authentication(router)  ;
    users(router)           ;
    tables(router)          ;
    menu(router)            ;
    orders(router)          ;
    bills(router)           ;
    return router           ;
};