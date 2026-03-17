"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Database } from "lucide-react"

const SAMPLE_HERBS = [
  {
    name: "Ginseng (인삼, Insam)",
    properties: "Warming, sweet, slightly bitter",
    uses: "Fatigue, weakness, digestive issues, immune support",
    research: "Studies suggest potential benefits for energy, cognitive function, and immune system",
  },
  {
    name: "Astragalus (황기, Hwanggi)",
    properties: "Warming, sweet",
    uses: "Immune support, fatigue, digestive weakness",
    research: "Research indicates immune-enhancing properties and potential cardiovascular benefits",
  },
  {
    name: "Licorice Root (감초, Gamcho)",
    properties: "Neutral to warm, sweet",
    uses: "Digestive issues, respiratory conditions, harmonizing other herbs",
    research: "Contains compounds with anti-inflammatory and antimicrobial properties",
  },
  {
    name: "Cinnamon (계피, Gyepi)",
    properties: "Hot, sweet, pungent",
    uses: "Cold conditions, digestive issues, circulation",
    research: "Studies show potential benefits for blood sugar regulation and antimicrobial effects",
  },
  {
    name: "Angelica (당귀, Danggwi)",
    properties: "Warming, sweet, pungent",
    uses: "Blood nourishment, women's health, circulation",
    research: "Contains compounds that may support cardiovascular health and hormone balance",
  },
]

export function HerbalDatabase() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHerbs = SAMPLE_HERBS.filter(
    (herb) =>
      herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.uses.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="shadow-md border-green-100">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="text-xl text-green-800 flex items-center">
          <Database className="mr-2 h-5 w-5" />
          Herbal Database
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search herbs by name or use..."
            className="pl-8 border-green-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4 mt-4 max-h-[400px] overflow-y-auto pr-2">
          {filteredHerbs.length > 0 ? (
            filteredHerbs.map((herb, index) => (
              <div key={index} className="p-3 border border-green-100 rounded-md hover:bg-green-50 transition-colors">
                <h4 className="font-medium text-green-800">{herb.name}</h4>
                <div className="mt-1 text-sm">
                  <span className="font-medium text-green-700">Properties: </span>
                  <span className="text-gray-600">{herb.properties}</span>
                </div>
                <div className="mt-1 text-sm">
                  <span className="font-medium text-green-700">Traditional Uses: </span>
                  <span className="text-gray-600">{herb.uses}</span>
                </div>
                <div className="mt-1 text-sm">
                  <span className="font-medium text-green-700">Research: </span>
                  <span className="text-gray-600">{herb.research}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No herbs found matching your search.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
