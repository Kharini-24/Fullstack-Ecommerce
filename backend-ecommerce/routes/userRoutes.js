import express from "express"
import { registerUser, loginUser } from "../controllers/userController.js"
import protect from "../middleware/authMiddleware.js"
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

// 🔒 TEST PROTECTED ROUTE
router.get("/profile", protect, (req, res) => {
  res.json(req.user)
})

router.get("/profile", protect, getUserProfile);

export default router
