import express from 'express';

import { getBills, new_Bill } from '../controllers/bills_utilities'
import { isAuthenticated, isAdmin} from '../middlewares/auth_role';


export default (router : express.Router) => {
    router.get('/bills', isAuthenticated ,isAdmin ,getBills);
    router.post('/tables/:n_table/bill', isAuthenticated,  isAdmin, new_Bill);
}