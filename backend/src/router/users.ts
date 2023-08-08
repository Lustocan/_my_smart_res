import express from 'express';

import { getAllUsers, deleteUser, updateUser} from '../controllers/users_utilities'
import { isAuthenticated, isAdmin, sameUser } from '../middlewares/auth_role';


export default (router : express.Router) => {
    router.get('/users' , isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isAdmin , deleteUser);
    router.patch('/users/:id', isAuthenticated, sameUser||isAdmin , updateUser);
}