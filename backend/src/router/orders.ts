import express from "express" 
import { isAuthenticated, isAdmin, isWaiter , isWaiterOrAdmin} from '../middlewares/auth_role';
import { getAllOrdersInThisTable, new_Order } from "../controllers/orders_utilities";

export default (router : express.Router) => {
    router.get("/tables/:n_table", isAuthenticated ,isWaiterOrAdmin, getAllOrdersInThisTable) ;
    router.post("/tables/:n_table/add_order", isAuthenticated, isWaiterOrAdmin, new_Order) ;
}