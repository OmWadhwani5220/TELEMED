import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";

import authRoutes from "./routes/authRoutes.js";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Telemed DB
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/telemed";

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded PDFs/images

// Health Check
app.get("/health", (req, res) => {
  res.json({ ok: true, dbState: mongoose.connection.readyState });
});

/* =============================================================
   CONTACT FORM API  (UNCHANGED, WORKS EXACTLY AS YOUR VERSION)
============================================================= */
app.post(
  "/api/contact",
  [
    body("name").notEmpty().withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("message").notEmpty().withMessage("Message required"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, phone, subject, message, agree } = req.body;

      const c = new Contact({
        name,
        email,
        phone,
        subject,
        message,
        agree: !!agree,
      });

      const saved = await c.save();

      return res
        .status(201)
        .json({ message: "Contact saved", id: saved._id });
    } catch (err) {
      console.error("Save error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

/* =============================================================
   AUTH ROUTES (SIGNUP + LOGIN + USER VIEW)
============================================================= */
app.use("/api/auth", authRoutes);

/* =============================================================
  CONNECT TO DATABASE & START SERVER
============================================================= */
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected to Telemed");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
