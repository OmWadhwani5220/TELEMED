// App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import "./App.css";

// Simple Home component (you can move to its own file if you prefer)
const Home = () => {
  return (
    <main className="main-content">
      <h1>Welcome to TeleMed</h1>
      <p>Your trusted telemedicine platform</p>
    </main>
  );
};

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          {/* Add a Route for FAQ if you add a FAQ component later:
              <Route path="/faq" element={<Faq />} /> */}
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
