import Signup from "../models/Signup.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

/* =====================================================
    SIGNUP CONTROLLER (FOR PATIENT + DOCTOR)
===================================================== */
export const signup = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      role,
      clinicName,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // --- UNIQUE EMAIL VALIDATION ---
    const exists = await Signup.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // --- HASH PASSWORD ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const userData = {
      name,
      phone,
      email,
      password: hashedPassword,
      role,
      verified: role === "patient" ? true : false, // patient auto-login TRUE
    };

    /* ======================================================
      PATIENT → Upload patientPdf
    ====================================================== */
    if (role === "patient") {
      if (req.files?.patientPdf?.[0]) {
        userData.patientPdf = req.files.patientPdf[0].path;
      }
    }

    /* ======================================================
      DOCTOR → Upload multiple PDFs + extra fields
    ====================================================== */
    if (role === "doctor") {
      userData.clinicName = clinicName || "";
      userData.verified = false; // ❗ doctor must be verified by admin

      if (req.files?.qualificationPdf?.[0])
        userData.qualificationPdf = req.files.qualificationPdf[0].path;

      if (req.files?.clinicRegistrationPdf?.[0])
        userData.clinicRegistrationPdf =
          req.files.clinicRegistrationPdf[0].path;

      if (req.files?.aadhaarPdf?.[0])
        userData.aadhaarPdf = req.files.aadhaarPdf[0].path;

      if (req.files?.licensePdf?.[0])
        userData.licensePdf = req.files.licensePdf[0].path;
    }

    // --- SAVE USER ---
    const newUser = await Signup.create(userData);

    return res.status(201).json({
      msg: "Signup successful",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        verified: newUser.verified,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


/* =====================================================
    LOGIN CONTROLLER
===================================================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    const user = await Signup.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Doctor cannot login until verified
    if (user.role === "doctor" && !user.verified) {
      return res.status(403).json({ msg: "Your account is not verified yet." });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};


/* =====================================================
    GET ALL USERS (ADMIN PANEL)
===================================================== */
export const getAllUsers = async (req, res) => {
  try {
    const users = await Signup.find().select("-password");
    return res.json({ users });
  } catch (err) {
    console.error("Get users error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
