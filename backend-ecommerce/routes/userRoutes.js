import express from "express"
import { registerUser, loginUser,getAllUsers } from "../controllers/userController.js"
import protect from "../middleware/authMiddleware.js"
import { getUserProfile } from "../controllers/userController.js";

import { admin } from "../middleware/adminMiddleware.js";



const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/admin", protect, admin, (req, res) => {
  res.json({ message: "Admin route working" });
});

// 🔒 TEST PROTECTED ROUTE


router.get("/profile", protect, getUserProfile);
router.get("/", protect, admin, getAllUsers);
export default router
