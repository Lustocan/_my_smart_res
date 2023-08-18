import express from "express" 
import { isAuthenticated, isAdmin, isWaiter , isWaiterOrAdmin} from '../middlewares/auth_role';
import { getAllOrders, getAllOrdersInThisTable, new_Order } from "../controllers/orders_utilities";

export default (router : express.Router) => {
    router.get("/orders/:n_table", isAuthenticated ,isWaiterOrAdmin, getAllOrdersInThisTable) ;
    router.post("/tables/:n_table/add_order", isAuthenticated, isWaiterOrAdmin, new_Order) ;
    router.get("/orders",isAuthenticated,getAllOrders);
    //TODO fare una delete
}