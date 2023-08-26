import express from "express" 
import { isAuthenticated, isAdmin, isWaiter , isWaiterOrAdmin, isCookOrAdmin, isBartenderOrAdmin} from '../middlewares/auth_role';
import { deleteAllOrdersInThisTable, deleteOrder, getAllOrders, getAllOrdersInThisTable, new_Order, updateOrder } from "../controllers/orders_utilities";

export default (router : express.Router) => {
    router.get("/orders/:n_table", isAuthenticated ,isAdmin, getAllOrdersInThisTable) ;
    router.post("/tables/:n_table/add_order", isAuthenticated, isWaiterOrAdmin, new_Order) ;
    router.get("/orders",isAuthenticated ,getAllOrders);
    router.get("/orders/kitchen/all", isAuthenticated, isCookOrAdmin ,getAllOrders);
    router.get("/orders/bar/all", isAuthenticated, isBartenderOrAdmin ,getAllOrders);
    router.delete("/orders/:_id/delete", isAuthenticated, isAdmin, deleteOrder);
    router.patch("/orders/:_id/update", isAuthenticated , updateOrder);
    router.delete("/orders/:n_table",isAuthenticated, isAdmin, deleteAllOrdersInThisTable);
}