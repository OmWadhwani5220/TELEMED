import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema(
  {
    // USER ROLE
    role: {
      type: String,
      enum: ["patient", "doctor"],
      required: true,
    },

    // BASIC USER INFO
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // VERIFY STATUS
    verified: { type: Boolean, default: false },

    /* =========================================
       PATIENT FIELD
    ========================================== */
    patientPdf: { type: String }, // patient identity proof PDF

    /* =========================================
       DOCTOR FIELDS
    ========================================== */
    clinicName: { type: String },

    qualificationPdf: { type: String },       // degree / certification
    clinicRegistrationPdf: { type: String },  // clinic registration
    aadhaarPdf: { type: String },             // Aadhaar card
    licensePdf: { type: String },             // medical license
  },
  {
    collection: "Signup",     // 👉 EXACT collection name
    timestamps: true          // OPTIONAL but recommended
  }
);

export default mongoose.model("Signup", SignupSchema);
