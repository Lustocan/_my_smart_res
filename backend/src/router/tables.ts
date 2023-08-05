import express from "express" 
import { isAuthenticated, isAdmin, isWaiter } from '../middlewares/auth_role';
import { build_tab, delete_tab, update_tab, getAllTables } from "../controllers/tables_utilities";

export default (router : express.Router) => {
    router.get("/tables", isAuthenticated , getAllTables) ;
    router.post("/tables/add", isAuthenticated, isAdmin, build_tab) ;
    router.delete("/tables/:number/delete", isAuthenticated, isAdmin, delete_tab) ;
    router.patch("/tables/:number/update", isAuthenticated, isAdmin||isWaiter, update_tab) ;
}