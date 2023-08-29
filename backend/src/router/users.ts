import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUser} from '../controllers/users_utilities'
import { isAuthenticated, isAdmin, sameUser, isWaiterOrAdmin } from '../middlewares/auth_role';


export default (router : express.Router) => {
    router.get('/users' , isAuthenticated, isAdmin, getAllUsers);  // added isAdmin
    router.delete('/users/:id', isAuthenticated, isAdmin , deleteUser);
    router.patch('/users/:id', isAuthenticated, isAdmin , updateUser);
    router.get('/user', isAuthenticated ,getUser);  
}