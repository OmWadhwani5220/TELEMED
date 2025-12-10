import Header from "./components/Header"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1>Welcome to TeleMed</h1>
        <p>Your trusted telemedicine platform</p>
      </main>
      <Footer />
    </div>
  )
}

export default App
