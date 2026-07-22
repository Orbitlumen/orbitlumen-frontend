import { Hero } from "../components/Hero"
import { StatsBar } from "../components/StatsBar"
import { CatalogPreview } from "../components/CatalogPreview"
import { FeaturesGrid } from "../components/FeaturesGrid"
import { HowItWorks } from "../components/HowItWorks"
import { CtaBanner } from "../components/CtaBanner"

export function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CatalogPreview />
      <FeaturesGrid />
      <HowItWorks />
      <CtaBanner />
    </>
  )
}
