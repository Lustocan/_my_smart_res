import express from 'express';

import { deleteElement, updateElement, addNewElement, getAllByKind } from '../controllers/menu_utilities'
import { isAuthenticated, isAdmin, isWaiterOrAdmin} from '../middlewares/auth_role';


export default (router : express.Router) => {
    router.get('/menu/:kind', getAllByKind);
    router.delete('/menu/:id/delete', isAuthenticated, isAdmin , deleteElement);
    router.post('/menu/:kind', isAuthenticated, isAdmin, addNewElement);
}