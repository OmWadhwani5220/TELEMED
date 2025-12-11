import express from "express";
import upload from "../middleware/upload.js";
import { signup, login, getAllUsers } from "../controllers/authController.js";

const router = express.Router();

// SIGNUP ROUTE → supports patient & doctor file uploads
router.post(
  "/signup",
  upload.fields([
    { name: "patientPdf", maxCount: 1 },              // patient identity
    { name: "qualificationPdf", maxCount: 1 },        // doctor qualification
    { name: "clinicRegistrationPdf", maxCount: 1 },   // clinic registration
    { name: "aadhaarPdf", maxCount: 1 },              // doctor Aadhaar
    { name: "licensePdf", maxCount: 1 },              // doctor license
  ]),
  signup
);

// LOGIN ROUTE
router.post("/login", login);

// ADMIN or internal route → GET all users
router.get("/all", getAllUsers);

export default router;
