import express from "express" 
import { isAuthenticated, isWaiterOrAdmin } from '../middlewares/auth_role';
import { build_tab, delete_tab, update_tab, getAllTables, getTableByNumber } from "../controllers/tables_utilities";

export default (router : express.Router) => {
    router.get("/tables", isAuthenticated, isWaiterOrAdmin, getAllTables) ; 
    router.post("/tables", isAuthenticated, isWaiterOrAdmin, build_tab) ;
    router.delete("/tables/:number", isAuthenticated, isWaiterOrAdmin, delete_tab) ;
    router.patch("/tables/:number", isAuthenticated , isWaiterOrAdmin, update_tab) ;
    router.get("/tables/:number", isAuthenticated, isWaiterOrAdmin, getTableByNumber ) ;
}