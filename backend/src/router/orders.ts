import express from "express" 
import { isAuthenticated, isAdmin , isWaiterOrAdmin, isCookOrAdmin, isBartenderOrAdmin, isBartenderCookOrAdmin} from '../middlewares/auth_role';
import { deleteAllOrdersInThisTable, deleteOrder, getAllOrders, getAllOrdersInThisTable, new_Order, updateOrder } from "../controllers/orders_utilities";

export default (router : express.Router) => {
    router.get("/orders/:n_table", isAuthenticated ,isAdmin, getAllOrdersInThisTable) ;
    router.post("/orders/:n_table", isAuthenticated, isWaiterOrAdmin, new_Order) ;
    router.delete("/orders/:n_table",isAuthenticated, isWaiterOrAdmin, deleteAllOrdersInThisTable);
    router.delete("/order/:_id", isAuthenticated, isAdmin, deleteOrder);
    router.patch("/orders/:_id", isAuthenticated , isBartenderCookOrAdmin, updateOrder);
    router.get("/orders", isAuthenticated, isAdmin ,getAllOrders);  
    router.get("/orders/kitchen/queue", isAuthenticated, isCookOrAdmin ,getAllOrders);
    router.get("/orders/bar/queue", isAuthenticated, isBartenderOrAdmin ,getAllOrders);
}