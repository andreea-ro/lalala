import express from "express"; 
import { createTable, deleteTable, getTable, getTables, updateTable } from "../controllers/table.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router =  express.Router();

//CREATE
router.post("/", verifyAdmin, createTable );
//UPDATE
router.put("/:id", verifyAdmin, updateTable);
//DELETE
router.delete("/:id/:restaurantid", verifyAdmin, deleteTable);
//GET
router.get("/:id", getTable);
//GET ALL
router.get("/", getTables);


export default router