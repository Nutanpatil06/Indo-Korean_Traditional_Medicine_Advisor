"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMedicineSystem } from "@/hooks/use-medicine-system"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SeasonalRemedy {
  name: string
  description: string
  benefits: string[]
  system: "korean" | "ayurvedic" | "both"
  season: "spring" | "summer" | "autumn" | "winter"
  image: string
}

export function SeasonalRecommendations() {
  const { system } = useMedicineSystem()
  const [currentSeason, setCurrentSeason] = useState<"spring" | "summer" | "autumn" | "winter">("spring")
  const [currentIndex, setCurrentIndex] = useState(0)

  // Get actual season based on hemisphere
  useEffect(() => {
    const month = new Date().getMonth()
    // Northern hemisphere seasons
    if (month >= 2 && month <= 4) setCurrentSeason("spring")
    else if (month >= 5 && month <= 7) setCurrentSeason("summer")
    else if (month >= 8 && month <= 10) setCurrentSeason("autumn")
    else setCurrentSeason("winter")
  }, [])

  const seasonalRemedies: SeasonalRemedy[] = [
    // Spring remedies
    {
      name: "Dandelion Tea",
      description:
        "A gentle detoxifying herb that supports liver function and helps the body transition from winter to spring.",
      benefits: ["Liver support", "Detoxification", "Digestive aid"],
      system: "both",
      season: "spring",
      image: "/images/spring-herbs.jpg",
    },
    {
      name: "Ssanghwa-tang",
      description:
        "A traditional Korean herbal formula that helps boost energy and vitality during seasonal transitions.",
      benefits: ["Energy boost", "Immune support", "Stress relief"],
      system: "korean",
      season: "spring",
      image: "/images/spring-herbs.jpg",
    },
    {
      name: "Neem (Azadirachta indica)",
      description:
        "An Ayurvedic herb that helps purify the blood and support the body's natural cleansing processes in spring.",
      benefits: ["Blood purification", "Skin health", "Immune support"],
      system: "ayurvedic",
      season: "spring",
      image: "/images/spring-herbs.jpg",
    },

    // Summer remedies
    {
      name: "Chrysanthemum Tea",
      description:
        "A cooling herb in Korean medicine that helps dispel heat and soothe the body during hot summer months.",
      benefits: ["Heat relief", "Eye health", "Calming effect"],
      system: "korean",
      season: "summer",
      image: "/images/summer-herbs.jpg",
    },
    {
      name: "Amla (Indian Gooseberry)",
      description: "A cooling Ayurvedic fruit that balances Pitta dosha and provides heat protection during summer.",
      benefits: ["Vitamin C source", "Cooling effect", "Digestive support"],
      system: "ayurvedic",
      season: "summer",
      image: "/images/summer-herbs.jpg",
    },
    {
      name: "Lotus Leaf Tea",
      description: "Used in both traditions to cool the body and support healthy circulation during hot weather.",
      benefits: ["Cooling effect", "Circulation support", "Mild diuretic"],
      system: "both",
      season: "summer",
      image: "/images/summer-herbs.jpg",
    },

    // Autumn remedies
    {
      name: "Astragalus (Huang Qi)",
      description: "A Korean herb that strengthens the immune system as the weather begins to cool in autumn.",
      benefits: ["Immune support", "Energy boost", "Lung protection"],
      system: "korean",
      season: "autumn",
      image: "/images/autumn-herbs.jpg",
    },
    {
      name: "Trikatu",
      description: "An Ayurvedic spice blend that helps kindle digestive fire and prepare the body for colder months.",
      benefits: ["Digestive support", "Metabolism boost", "Respiratory health"],
      system: "ayurvedic",
      season: "autumn",
      image: "/images/autumn-herbs.jpg",
    },
    {
      name: "Ginger Tea",
      description:
        "Valued in both traditions for warming the body and supporting immunity during seasonal transitions.",
      benefits: ["Warming effect", "Digestive aid", "Immune support"],
      system: "both",
      season: "autumn",
      image: "/images/autumn-herbs.jpg",
    },

    // Winter remedies
    {
      name: "Korean Ginseng",
      description: "A warming tonic herb that builds vital energy and helps the body adapt to cold winter conditions.",
      benefits: ["Energy boost", "Circulation support", "Stress adaptation"],
      system: "korean",
      season: "winter",
      image: "/images/winter-herbs.jpg",
    },
    {
      name: "Ashwagandha",
      description: "An Ayurvedic adaptogen that strengthens the body's resilience to stress and cold during winter.",
      benefits: ["Stress relief", "Immune support", "Energy balance"],
      system: "ayurvedic",
      season: "winter",
      image: "/images/winter-herbs.jpg",
    },
    {
      name: "Cinnamon Tea",
      description:
        "Used in both traditions to warm the body, improve circulation, and support immunity in cold weather.",
      benefits: ["Warming effect", "Blood sugar balance", "Circulation support"],
      system: "both",
      season: "winter",
      image: "/images/winter-herbs.jpg",
    },
  ]

  // Filter remedies by current season and selected medicine system
  const filteredRemedies = seasonalRemedies.filter(
    (remedy) =>
      remedy.season === currentSeason &&
      (system === "integrated" || remedy.system === system || remedy.system === "both"),
  )

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredRemedies.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredRemedies.length - 1 ? 0 : prev + 1))
  }

  const getSeasonColor = (season: string) => {
    switch (season) {
      case "spring":
        return "green"
      case "summer":
        return "yellow"
      case "autumn":
        return "orange"
      case "winter":
        return "blue"
      default:
        return "green"
    }
  }

  const seasonColor = getSeasonColor(currentSeason)

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSeason("spring")}
            className={`${currentSeason === "spring" ? "bg-green-100 text-green-800 border-green-300" : ""}`}
          >
            Spring
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSeason("summer")}
            className={`${currentSeason === "summer" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : ""}`}
          >
            Summer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSeason("autumn")}
            className={`${currentSeason === "autumn" ? "bg-orange-100 text-orange-800 border-orange-300" : ""}`}
          >
            Autumn
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSeason("winter")}
            className={`${currentSeason === "winter" ? "bg-blue-100 text-blue-800 border-blue-300" : ""}`}
          >
            Winter
          </Button>
        </div>

        <div className="text-sm text-gray-500">Current recommendations for {currentSeason}</div>
      </div>

      {filteredRemedies.length > 0 ? (
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 rounded-full h-10 w-10"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredRemedies.map((remedy, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className={`border-${seasonColor}-200 overflow-hidden`}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={remedy.image || "/placeholder.svg"}
                          alt={remedy.name}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-xl font-semibold text-${seasonColor}-800`}>{remedy.name}</h3>
                            <Badge className={`bg-${seasonColor}-100 text-${seasonColor}-800`}>
                              {remedy.system === "korean"
                                ? "Korean"
                                : remedy.system === "ayurvedic"
                                  ? "Ayurvedic"
                                  : "Both Traditions"}
                            </Badge>
                          </div>

                          <p className="text-gray-600 mb-4">{remedy.description}</p>

                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
                            <div className="flex flex-wrap gap-2">
                              {remedy.benefits.map((benefit, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className={`border-${seasonColor}-200 text-${seasonColor}-700`}
                                >
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4">
                            <Button className={`bg-${seasonColor}-600 hover:bg-${seasonColor}-700 text-white`}>
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 rounded-full h-10 w-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-4">
            {filteredRemedies.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? `bg-${seasonColor}-600` : "bg-gray-300"}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-gray-200">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No remedies available for the selected season and medicine system.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
