"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Leaf, BookOpen } from "lucide-react"
import { koreanHerbs, ayurvedicHerbs, searchHerbs, HerbalRemedyDetailed } from "@/lib/herbal-database"
import { motion } from "framer-motion"

export function HerbDatabaseViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [system, setSystem] = useState<"korean" | "ayurvedic" | "all">("all")
  const [selectedHerb, setSelectedHerb] = useState<HerbalRemedyDetailed | null>(null)
  const [filterTemp, setFilterTemp] = useState<string>("")

  const allHerbs = [...koreanHerbs, ...ayurvedicHerbs]

  const filteredHerbs = useMemo(() => {
    let results = allHerbs

    if (system !== "all") {
      results = results.filter((h) => h.system === system || h.system === "both")
    }

    if (searchQuery) {
      results = searchHerbs(searchQuery)
      if (system !== "all") {
        results = results.filter((h) => h.system === system || h.system === "both")
      }
    }

    if (filterTemp) {
      results = results.filter((h) => h.energetics.temperature === filterTemp)
    }

    return results.sort((a, b) => a.name.localeCompare(b.name))
  }, [searchQuery, system, filterTemp])

  const stats = useMemo(() => {
    return {
      total: allHerbs.length,
      korean: koreanHerbs.length,
      ayurvedic: ayurvedicHerbs.length,
      searching: filteredHerbs.length,
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold text-green-800">Herbal Remedy Database</h1>
        <p className="text-gray-600">
          Comprehensive collection of {stats.total} traditional medicine herbs
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Herbs", value: stats.total },
          { label: "Korean", value: stats.korean },
          { label: "Ayurvedic", value: stats.ayurvedic },
          { label: "Results", value: stats.searching },
        ].map((stat, i) => (
          <Card key={i} className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-green-700">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search herbs by name, symptom, or benefit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 h-auto"
          />
        </div>

        <Tabs value={system} onValueChange={(v) => setSystem(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Systems</TabsTrigger>
            <TabsTrigger value="korean">Korean</TabsTrigger>
            <TabsTrigger value="ayurvedic">Ayurvedic</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterTemp === "" ? "default" : "outline"}
            onClick={() => setFilterTemp("")}
            size="sm"
          >
            All Temperatures
          </Button>
          {["cold", "cool", "neutral", "warm", "hot"].map((temp) => (
            <Button
              key={temp}
              variant={filterTemp === temp ? "default" : "outline"}
              onClick={() => setFilterTemp(temp)}
              size="sm"
              className="capitalize"
            >
              {temp}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Herb List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="h-[600px] overflow-y-auto">
            <CardHeader className="sticky top-0 bg-white z-10">
              <CardTitle className="text-lg">Herbs</CardTitle>
              <CardDescription>{filteredHerbs.length} results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredHerbs.map((herb) => (
                <motion.button
                  key={herb.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedHerb(herb)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedHerb?.id === herb.id
                      ? "bg-green-100 border-l-4 border-green-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <p className="font-medium text-sm">{herb.name}</p>
                  <p className="text-xs text-gray-500">{herb.category}</p>
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Herb Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          {selectedHerb ? (
            <Card className="h-[600px] overflow-y-auto">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedHerb.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedHerb.system === "korean"
                        ? selectedHerb.koreanName
                        : selectedHerb.sanskritName}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {selectedHerb.system}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Scientific Name</p>
                      <p className="font-medium italic">{selectedHerb.scientificName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Part Used</p>
                      <p className="font-medium">{selectedHerb.partUsed}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Temperature</p>
                      <p className="font-medium capitalize">{selectedHerb.energetics.temperature}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Season</p>
                      <p className="font-medium capitalize">{selectedHerb.season}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Benefits</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedHerb.benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Treats</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedHerb.symptoms.map((symptom) => (
                      <Badge key={symptom} variant="outline" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dosage */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Dosage</h4>
                  <div className="space-y-1 text-xs bg-gray-50 p-3 rounded">
                    {Object.entries(selectedHerb.dosage).map(([form, dose]) => (
                      <div key={form}>
                        <span className="font-medium capitalize">{form}:</span> {dose}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactions */}
                {selectedHerb.interactions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-amber-700">Interactions</h4>
                    <ul className="text-xs space-y-1 text-amber-600">
                      {selectedHerb.interactions.map((interaction) => (
                        <li key={interaction}>• {interaction}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Contraindications */}
                {selectedHerb.contraindications.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-red-700">Contraindications</h4>
                    <ul className="text-xs space-y-1 text-red-600">
                      {selectedHerb.contraindications.map((contra) => (
                        <li key={contra}>• {contra}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <Leaf className="h-12 w-12 text-gray-300 mx-auto" />
                <p className="text-gray-500">Select an herb to view details</p>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
