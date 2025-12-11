// App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

import Signup from "./components/Signup";
import Login from "./components/Login";
import ViewUsers from "./components/ViewUsers";

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />

          {/* NEW USER MANAGEMENT ROUTES */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<ViewUsers />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
