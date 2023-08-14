import express from 'express';

import { getAllElements, deleteElement, updateElement, addNewElement, getAllByKind } from '../controllers/menu_utilities'
import { isAuthenticated, isAdmin } from '../middlewares/auth_role';


export default (router : express.Router) => {
    router.get('/menu', getAllElements);
    router.get('/menu/:kind', getAllByKind);
    router.delete('/menu/:id/delete', isAuthenticated, isAdmin , deleteElement);
    router.patch('/menu/:id/update', isAuthenticated, isAdmin , updateElement);
    router.post('/menu/add', isAuthenticated, isAdmin, addNewElement);
}