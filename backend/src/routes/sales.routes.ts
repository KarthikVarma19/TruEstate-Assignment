import express from "express";
import { getAllSales } from "../controllers/sales.controller";

  
const salesRouter = express.Router();

salesRouter.get("/", getAllSales);

export default salesRouter;