import express from "express";
import { createOrder, getOrders } from "../controllers/ordersController.js";
const router = express.Router();

router.get('/orders',getOrders)
router.post('/orders',createOrder)

export default router