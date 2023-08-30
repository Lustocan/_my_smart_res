import express from "express" 
import { isAuthenticated, isAdmin, isWaiter, isWaiterOrAdmin } from '../middlewares/auth_role';
import { build_tab, delete_tab, update_tab, getAllTables, getTableByNumber } from "../controllers/tables_utilities";

export default (router : express.Router) => {
    router.get("/tables", isAuthenticated, isWaiterOrAdmin, getAllTables) ; // added isWaiterOrAdmin
    router.post("/tables/add", isAuthenticated, isWaiterOrAdmin, build_tab) ;
    router.delete("/tables/:number/delete", isAuthenticated, isWaiterOrAdmin, delete_tab) ;
    router.patch("/tables/:number/update", isAuthenticated , isWaiterOrAdmin, update_tab) ;
    router.get("/tables/:number", isAuthenticated, isWaiterOrAdmin, getTableByNumber ) ;
}