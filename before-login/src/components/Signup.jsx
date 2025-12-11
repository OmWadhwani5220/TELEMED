import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [role, setRole] = useState("patient");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    clinicName: "",
  });

  const [files, setFiles] = useState({
    patientPdf: null,
    qualificationPdf: null,
    clinicRegistrationPdf: null,
    aadhaarPdf: null,
    licensePdf: null,
  });

  const [errors, setErrors] = useState({});

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFile = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    // NAME
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(form.name)) {
      newErrors.name = "Name can only contain letters";
    }

    // PHONE
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    // EMAIL
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    // PASSWORD
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // PATIENT FILE
    if (role === "patient") {
      if (!files.patientPdf) {
        newErrors.patientPdf = "Patient PDF is required";
      } else if (files.patientPdf.type !== "application/pdf") {
        newErrors.patientPdf = "File must be a PDF";
      }
    }

    // DOCTOR VALIDATION
    if (role === "doctor") {
      if (!form.clinicName.trim()) {
        newErrors.clinicName = "Clinic name is required";
      }

      const docFiles = [
        { key: "qualificationPdf", label: "Qualification PDF" },
        { key: "clinicRegistrationPdf", label: "Clinic Registration PDF" },
        { key: "aadhaarPdf", label: "Aadhaar PDF" },
        { key: "licensePdf", label: "License PDF" },
      ];

      docFiles.forEach((file) => {
        if (!files[file.key]) {
          newErrors[file.key] = `${file.label} is required`;
        } else if (files[file.key].type !== "application/pdf") {
          newErrors[file.key] = `${file.label} must be a PDF`;
        }
      });
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Stop submission if validation fails
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("phone", form.phone);
    fd.append("email", form.email);
    fd.append("password", form.password);
    fd.append("role", role);
    fd.append("clinicName", form.clinicName);

    if (role === "patient") {
      fd.append("patientPdf", files.patientPdf);
    }

    if (role === "doctor") {
      fd.append("qualificationPdf", files.qualificationPdf);
      fd.append("clinicRegistrationPdf", files.clinicRegistrationPdf);
      fd.append("aadhaarPdf", files.aadhaarPdf);
      fd.append("licensePdf", files.licensePdf);
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      alert(data.msg);
    } catch (err) {
      console.error(err);
      alert("Signup failed — check backend");
    }
  };

  return (
    <div className="tm-signup-page">
      <div className="tm-signup-card">
        <h2 className="tm-signup-title">Create Your Account</h2>
        <p className="tm-signup-subtitle">
          Join TeleMed and begin your healthcare journey
        </p>

        <form className="tm-signup-form" onSubmit={handleSubmit}>
          {/* ROLE */}
          <div className="tm-form-field">
            <label className="tm-form-label">Signup as</label>
            <select
              className="tm-role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* NAME */}
          <div className="tm-form-field">
            <label className="tm-form-label">Full Name</label>
            <input
              className="tm-input"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          {/* PHONE */}
          <div className="tm-form-field">
            <label className="tm-form-label">Phone Number</label>
            <input
              className="tm-input"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </div>

          {/* EMAIL */}
          <div className="tm-form-field">
            <label className="tm-form-label">Email</label>
            <input
              className="tm-input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          {/* PASSWORD */}
          <div className="tm-form-field">
            <label className="tm-form-label">Password</label>
            <input
              className="tm-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="tm-form-field">
            <label className="tm-form-label">Confirm Password</label>
            <input
              className="tm-input"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <small className="error">{errors.confirmPassword}</small>
            )}
          </div>

          {/* PATIENT FILE */}
          {role === "patient" && (
            <div className="tm-form-field">
              <label className="tm-form-label">Upload PDF</label>
              <input
                type="file"
                name="patientPdf"
                className="tm-file-input"
                accept="application/pdf"
                onChange={handleFile}
              />
              {errors.patientPdf && (
                <small className="error">{errors.patientPdf}</small>
              )}
            </div>
          )}

          {/* DOCTOR FIELDS */}
          {role === "doctor" && (
            <>
              <div className="tm-form-field">
                <label className="tm-form-label">Clinic Name</label>
                <input
                  className="tm-input"
                  name="clinicName"
                  value={form.clinicName}
                  onChange={handleChange}
                />
                {errors.clinicName && (
                  <small className="error">{errors.clinicName}</small>
                )}
              </div>

              {[
                { key: "qualificationPdf", label: "Qualification PDF" },
                { key: "clinicRegistrationPdf", label: "Clinic Registration PDF" },
                { key: "aadhaarPdf", label: "Aadhaar PDF" },
                { key: "licensePdf", label: "License PDF" },
              ].map((file) => (
                <div key={file.key} className="tm-form-field">
                  <label className="tm-form-label">{file.label}</label>
                  <input
                    type="file"
                    name={file.key}
                    className="tm-file-input"
                    accept="application/pdf"
                    onChange={handleFile}
                  />
                  {errors[file.key] && (
                    <small className="error">{errors[file.key]}</small>
                  )}
                </div>
              ))}
            </>
          )}

          <button className="tm-primary-btn" type="submit">
            Create Account
          </button>
        </form>

        <div className="tm-switch-auth">
          Already have an account?
          <button onClick={() => (window.location.href = "/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
