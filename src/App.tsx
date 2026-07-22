import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Home } from "./pages/Home"
import { CatalogPage } from "./pages/CatalogPage"
import { VaultPage } from "./pages/VaultPage"

function App() {
  return (
    <div className="min-h-screen bg-navy font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/vault" element={<VaultPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
