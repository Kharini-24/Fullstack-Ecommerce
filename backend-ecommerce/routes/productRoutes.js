import express from "express";
import protect from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { deleteProduct } from "../controllers/productController.js";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
