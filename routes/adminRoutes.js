import express from "express";
import { protect, admin } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Get all users (Admin only)
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// ✅ Get admin dashboard stats
router.get("/stats", protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments();
    
    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalContacts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;