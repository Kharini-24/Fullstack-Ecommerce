import express from "express"
import { addOrderItems,getMyOrders,getAllOrders,updateOrderToDelivered } from "../controllers/orderController.js"
import protect from "../middleware/authMiddleware.js"
import { admin } from "../middleware/adminMiddleware.js";


const router = express.Router()

// 🔒 CREATE ORDER
router.post("/", protect, addOrderItems)
router.get("/myorders", protect, getMyOrders)
router.get("/", protect, admin, getAllOrders);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router
