// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import contactRoutes from "./routes/contactRoutes.js";

// dotenv.config();

// const app = express();

// // ✅ CORS — sabse pehle, routes se pehle
// app.use(cors({
//   origin: [
//     "http://localhost:3000",
//     "http://localhost:5173",
//     "http://127.0.0.1:3000",
//     "http://127.0.0.1:5173"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/contact", contactRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Backend Running Successfully 🚀",
//   });
// });

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB Connected");

//     app.listen(process.env.PORT || 5001, () => {
//       console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5001}`);
//     });
//   } catch (error) {
//     console.log("❌ Database Connection Error:", error.message);
//     process.exit(1); // ✅ Server band karo agar DB connect na ho
//   }
// };

// connectDB();
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running Successfully 🚀",
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5001, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5001}`);
    });
  } catch (error) {
    console.log("❌ Database Connection Error:", error.message);
    process.exit(1);
  }
};

connectDB();