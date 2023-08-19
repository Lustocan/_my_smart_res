import express from "express" 
import { isAuthenticated, isAdmin, isWaiter , isWaiterOrAdmin} from '../middlewares/auth_role';
import { new_Queue, getAllQueues } from "../controllers/queue_utilites";

export default (router : express.Router) => {
    router.post("/orders/queue", isAuthenticated, new_Queue) ;
    router.get("/orders/queue",isAuthenticated, getAllQueues);
    //TODO fare una delete
}