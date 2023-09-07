import express from 'express';

import { deleteElement, addNewElement, getAllByKind } from '../controllers/menu_utilities'
import { isAuthenticated, isAdmin} from '../middlewares/auth_role';


export default (router : express.Router) => {
    router.get('/menu/:kind', isAuthenticated ,getAllByKind);
    router.post('/menu/:kind', isAuthenticated, isAdmin, addNewElement);
    router.delete('/menu/:id', isAuthenticated, isAdmin , deleteElement);
}