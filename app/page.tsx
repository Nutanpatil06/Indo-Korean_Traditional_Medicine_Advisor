import { Suspense } from "react"
import HerbalRemedyAdvisor from "@/components/herbal-remedy-advisor"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HeroSection } from "@/components/hero-section"
import { FeatureHighlights } from "@/components/feature-highlights"
import { MedicineSystemSelector } from "@/components/medicine-system-selector"
import { SeasonalRecommendations } from "@/components/seasonal-recommendations"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        <MedicineSystemSelector />

        <section className="mb-16 mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Personalized Remedy Advisor</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <HerbalRemedyAdvisor />
          </Suspense>
        </section>

        <FeatureHighlights />

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Seasonal Wellness</h2>
          <SeasonalRecommendations />
        </section>
      </div>

      <Footer />
    </main>
  )
}
