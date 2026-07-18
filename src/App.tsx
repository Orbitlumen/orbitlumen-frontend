import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { StatsBar } from "./components/StatsBar"
import { CatalogPreview } from "./components/CatalogPreview"
import { FeaturesGrid } from "./components/FeaturesGrid"
import { HowItWorks } from "./components/HowItWorks"
import { CtaBanner } from "./components/CtaBanner"
import { Footer } from "./components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-navy font-sans">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <CatalogPreview />
        <FeaturesGrid />
        <HowItWorks />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}

export default App
