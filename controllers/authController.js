import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    console.log("📝 Register Request:", req.body);

    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    // Remove password from response
    const userData = user.toObject();
    delete userData.password;

    console.log("✅ User Registered:", user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userData,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    console.log("🔐 Login Request:", req.body);

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Remove password from response
    const userData = user.toObject();
    delete userData.password;

    console.log("✅ User Logged In:", user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userData,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("❌ Get User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ✅ Update Password
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id);

    // Check current password
    const isPasswordMatch = await user.comparePassword(currentPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    console.log("✅ Password Updated:", user._id);

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("❌ Update Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ✅ Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      user.email = email;
    }

    await user.save();

    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: userData,
    });
  } catch (error) {
    console.error("❌ Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};