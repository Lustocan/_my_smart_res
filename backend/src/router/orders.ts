import express from "express" 
import { isAuthenticated, isAdmin, isWaiter , isWaiterOrAdmin} from '../middlewares/auth_role';
import { deleteOrder, getAllOrders, getAllOrdersInThisTable, new_Order, updateOrder } from "../controllers/orders_utilities";

export default (router : express.Router) => {
    router.get("/orders/:n_table", isAuthenticated ,isWaiterOrAdmin, getAllOrdersInThisTable) ;
    router.post("/tables/:n_table/add_order", isAuthenticated, isWaiterOrAdmin, new_Order) ;
    router.get("/orders",isAuthenticated,getAllOrders);
    router.delete("/orders/:_id/delete", isAuthenticated, isAdmin, deleteOrder);
    router.patch("/orders/:_id/update", isAuthenticated , updateOrder);
}