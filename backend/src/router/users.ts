import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUser} from '../controllers/users_utilities'
import { isAuthenticated, isAdmin, sameUser, isWaiterOrAdmin } from '../middlewares/auth_role';


export default (router : express.Router) => {
    router.get('/users' , isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isAdmin , deleteUser);
    router.patch('/users/:id', isAuthenticated, isWaiterOrAdmin , updateUser);
    router.get('/user' , getUser);
}