import express from "express"
import { addOrderItems,getMyOrders } from "../controllers/orderController.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

// 🔒 CREATE ORDER
router.post("/", protect, addOrderItems)
router.get("/myorders", protect, getMyOrders)
export default router
