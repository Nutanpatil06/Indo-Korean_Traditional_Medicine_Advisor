'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Loader2, Filter, Download, ThumbsUp, ThumbsDown, Bookmark, Share2, Calendar } from 'lucide-react'
import { recommendHerbalRemedies } from '@/lib/recommendation-engine'
import { useLocalStorage } from '@/hooks/use-storage'

interface HerbalRemedy {
  name: string
  description: string
  benefits?: string[]
  safetyRating?: number
  matchScore?: number
  traditionalUses?: string
  origin?: string
  warnings?: string
  interactions?: string[]
  preparation?: string
  dosage?: string
  storageInstructions?: string
  system?: string
  koreanName?: string
  sanskritName?: string
  dosages?: Array<{ form: string; amount: string }>
  preparationMethods?: string[]
  contraindications?: string[]
  researchReferences?: string[]
  activeCompounds?: string[]
}

const conditions = [
  { id: 'arthritis', label: 'Arthritis' },
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'insomnia', label: 'Insomnia' },
  { id: 'anxiety', label: 'Anxiety' },
  { id: 'digestive', label: 'Digestive Issues' },
  { id: 'respiratory', label: 'Respiratory Issues' },
  { id: 'skin', label: 'Skin Conditions' },
]

export default function HerbalRemedyAdvisor() {
  const { medicineSystem: system } = useLocalStorage()
  const color = system === 'korean' ? 'green' : system === 'ayurvedic' ? 'amber' : 'teal'

  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [duration, setDuration] = useState([7])
  const [severity, setSeverity] = useState([5])
  const [includePreventative, setIncludePreventative] = useState(true)
  const [dietaryPreferences, setDietaryPreferences] = useState('none')
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!symptoms.trim()) return

    setLoading(true)
    try {
      const severityMap: Record<number, 'mild' | 'moderate' | 'severe'> = {
        1: 'mild',
        2: 'mild',
        3: 'mild',
        4: 'moderate',
        5: 'moderate',
        6: 'moderate',
        7: 'severe',
        8: 'severe',
        9: 'severe',
        10: 'severe',
      }

      const results = await recommendHerbalRemedies(symptoms, {
        system,
        duration: duration[0],
        severity: severityMap[severity[0]] || 'moderate',
        includeFormulas: includePreventative,
        maxResults: 15,
      })
      setRecommendations(results)
    } catch (error) {
      console.error('Error getting recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={`text-${color}-800`}>Herbal Remedy Advisor</CardTitle>
        <CardDescription>
          Get personalized herbal recommendations based on your symptoms and health profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">Describe Your Symptoms</Label>
            <Input
              id="symptoms"
              placeholder="e.g., headache, insomnia, digestive issues..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className={`border-${color}-200 focus-visible:ring-${color}-500`}
            />
            <p className="text-xs text-gray-500">Be as specific as possible for better recommendations</p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="w-full"
          >
            {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
          </Button>

          {showAdvancedOptions && (
            <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="space-y-2">
                <Label>How long have you experienced these symptoms?</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={duration}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={setDuration}
                    className={`flex-1 data-[state=active]:bg-${color}-500`}
                  />
                  <span className="w-16 text-right">{duration[0]} days</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Severity of symptoms (1-10)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={severity}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={setSeverity}
                    className={`flex-1 data-[state=active]:bg-${color}-500`}
                  />
                  <span className="w-16 text-right">{severity[0]}/10</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="preventative"
                  checked={includePreventative}
                  onCheckedChange={setIncludePreventative}
                  className={`data-[state=checked]:bg-${color}-500`}
                />
                <Label htmlFor="preventative">Include preventative remedies</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary-preferences">Dietary Preferences</Label>
                <Select value={dietaryPreferences} onValueChange={setDietaryPreferences}>
                  <SelectTrigger id="dietary-preferences" className={`border-${color}-200`}>
                    <SelectValue placeholder="Select dietary preferences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No specific preferences</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten-free</SelectItem>
                    <SelectItem value="dairy-free">Dairy-free</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Pre-existing Conditions (if any)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {conditions.map((condition) => (
                    <div key={condition.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition.id}
                        checked={selectedConditions.includes(condition.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedConditions([...selectedConditions, condition.id])
                          } else {
                            setSelectedConditions(selectedConditions.filter((id) => id !== condition.id))
                          }
                        }}
                        className={`data-[state=checked]:bg-${color}-500 data-[state=checked]:border-${color}-500`}
                      />
                      <label
                        htmlFor={condition.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {condition.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className={`w-full bg-${color}-700 hover:bg-${color}-800`}
            disabled={loading || !symptoms.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Get Herbal Recommendations'
            )}
          </Button>
        </form>

        {recommendations.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium text-${color}-800`}>Recommended Herbal Remedies</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-gray-500">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="text-gray-500">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            <Tabs defaultValue="remedies">
              <TabsList className="mb-4">
                <TabsTrigger
                  value="remedies"
                  className={`data-[state=active]:bg-${color}-100 data-[state=active]:text-${color}-800`}
                >
                  Remedies
                </TabsTrigger>
                <TabsTrigger
                  value="research"
                  className={`data-[state=active]:bg-${color}-100 data-[state=active]:text-${color}-800`}
                >
                  Research Basis
                </TabsTrigger>
                <TabsTrigger
                  value="interactions"
                  className={`data-[state=active]:bg-${color}-100 data-[state=active]:text-${color}-800`}
                >
                  Interactions
                </TabsTrigger>
                <TabsTrigger
                  value="preparation"
                  className={`data-[state=active]:bg-${color}-100 data-[state=active]:text-${color}-800`}
                >
                  Preparation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="remedies">
                <div className="space-y-4">
                  {recommendations.map((rec, index) => {
                    const remedy = rec.item || rec
                    return (
                      <div key={index} className={`p-4 border border-${color}-100 rounded-md bg-${color}-50`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center flex-wrap gap-2">
                              <h4 className={`font-semibold text-lg text-${color}-800`}>{remedy.name}</h4>
                              {remedy.koreanName && (
                                <span className="text-sm text-gray-500">({remedy.koreanName})</span>
                              )}
                              {remedy.sanskritName && (
                                <span className="text-sm text-gray-500">({remedy.sanskritName})</span>
                              )}
                              {rec.safetyRating && (
                                <div
                                  className={`px-2 py-0.5 text-xs rounded-full bg-${rec.safetyRating >= 4 ? 'green' : rec.safetyRating >= 3 ? 'yellow' : 'red'}-100 text-${rec.safetyRating >= 4 ? 'green' : rec.safetyRating >= 3 ? 'yellow' : 'red'}-800`}
                                >
                                  Safety: {rec.safetyRating.toFixed(1)}/5
                                </div>
                              )}
                              {rec.matchScore && (
                                <div className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800">
                                  Match: {rec.matchScore}%
                                </div>
                              )}
                            </div>

                            <p className="text-sm text-gray-600 mt-2">{remedy.description}</p>

                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <span className="text-xs font-medium text-gray-700">Benefits: </span>
                                <div className="text-xs text-gray-600 flex flex-wrap gap-1 mt-1">
                                  {remedy.benefits &&
                                    remedy.benefits.slice(0, 3).map((benefit, i) => (
                                      <span key={i} className="bg-white px-2 py-1 rounded">
                                        {benefit}
                                      </span>
                                    ))}
                                </div>
                              </div>

                              <div>
                                <span className="text-xs font-medium text-gray-700">Traditional uses: </span>
                                <span className="text-xs text-gray-600 block mt-1">
                                  {remedy.traditionalUses || remedy.benefits?.join(', ')}
                                </span>
                              </div>
                            </div>

                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <span className="text-xs font-medium text-gray-700">Dosage: </span>
                                <span className="text-xs text-gray-600">
                                  {remedy.dosages && remedy.dosages[0]
                                    ? `${remedy.dosages[0].amount} ${remedy.dosages[0].form}`
                                    : 'Varies'}
                                </span>
                              </div>

                              <div>
                                <span className="text-xs font-medium text-gray-700">System: </span>
                                <span className="text-xs text-gray-600 capitalize">{remedy.system}</span>
                              </div>
                            </div>

                            {rec.reason && (
                              <div className="mt-2">
                                <span className="text-xs font-medium text-gray-700">Why recommended: </span>
                                <span className="text-xs text-gray-600">{rec.reason}</span>
                              </div>
                            )}

                            {remedy.contraindications && remedy.contraindications.length > 0 && (
                              <div className="mt-2 flex items-start">
                                <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-xs font-medium text-amber-700">Cautions: </span>
                                  <span className="text-xs text-amber-600">
                                    {remedy.contraindications.slice(0, 2).join(', ')}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-center space-y-2 ml-4">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ThumbsUp className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ThumbsDown className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Bookmark className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Share2 className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="research">
                <div className="space-y-4">
                  {recommendations.length === 0 ? (
                    <div className={`p-4 border border-${color}-100 rounded-md bg-${color}-50`}>
                      <p className="text-sm text-gray-600">Get recommendations first to see research basis.</p>
                    </div>
                  ) : (
                    recommendations.map((rec, index) => {
                      const remedy = rec.item || rec
                      return (
                        <div key={index} className={`p-4 border border-${color}-100 rounded-md bg-${color}-50`}>
                          <h5 className={`font-semibold text-${color}-800 mb-2`}>{remedy.name}</h5>
                          <p className="text-sm text-gray-600">{remedy.description}</p>

                          {remedy.researchReferences && remedy.researchReferences.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-700 mb-2">Research Support:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {remedy.researchReferences.slice(0, 3).map((ref, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{ref}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {remedy.activeCompounds && remedy.activeCompounds.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-700 mb-2">Active Compounds:</p>
                              <div className="text-xs text-gray-600 flex flex-wrap gap-1">
                                {remedy.activeCompounds.slice(0, 4).map((compound, i) => (
                                  <span key={i} className="bg-white px-2 py-1 rounded border border-gray-200">
                                    {compound}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </TabsContent>

              <TabsContent value="interactions">
                <div className={`p-4 border border-${color}-100 rounded-md bg-${color}-50`}>
                  <h4 className={`font-medium text-${color}-800 mb-2`}>Potential Interactions</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Herbal remedies can interact with medications and other supplements. Below are potential interactions
                    for the recommended remedies:
                  </p>

                  {recommendations.length > 0 ? (
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => {
                        const remedy = rec.item || rec
                        return (
                          <div key={index} className="mb-4 last:mb-0 p-3 bg-white rounded border border-gray-200">
                            <h5 className="text-sm font-semibold text-gray-800">{remedy.name}</h5>
                            <ul className="mt-2 text-sm text-gray-600">
                              {remedy.interactions && remedy.interactions.length > 0 ? (
                                remedy.interactions.map((interaction, idx) => (
                                  <li key={idx} className="flex items-start mt-2">
                                    <AlertCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{interaction}</span>
                                  </li>
                                ))
                              ) : (
                                <li className="flex items-start">
                                  <span className="mr-2 text-green-600">✓</span>
                                  <span>
                                    No known significant interactions reported. However, always consult with a healthcare
                                    provider before combining with medications.
                                  </span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Get recommendations first to see interaction information.</p>
                  )}

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Important Note</p>
                        <p className="text-xs text-amber-700 mt-1">
                          This information is not exhaustive. Always consult with a healthcare professional before
                          starting any herbal remedy, especially if you are taking medications, have pre-existing
                          conditions, are pregnant or nursing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preparation">
                <div className="space-y-4">
                  <div className={`p-4 border border-${color}-100 rounded-md bg-${color}-50`}>
                    <h4 className={`font-medium text-${color}-800 mb-2`}>Preparation Methods</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Proper preparation is essential for the efficacy and safety of herbal remedies. Below are detailed
                      preparation instructions for each recommended remedy:
                    </p>
                  </div>

                  {recommendations.length > 0 ? (
                    recommendations.map((rec, index) => {
                      const remedy = rec.item || rec
                      return (
                        <div key={index} className="p-3 bg-white rounded border border-gray-200">
                          <h5 className="text-sm font-semibold text-gray-800">{remedy.name}</h5>

                          {remedy.dosages && remedy.dosages.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-700 mb-2">Dosage Forms & Amounts:</p>
                              <div className="space-y-2">
                                {remedy.dosages.map((dosage, i) => (
                                  <div key={i} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                    <span className="font-medium capitalize">{dosage.form}:</span> {dosage.amount}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {remedy.preparationMethods && remedy.preparationMethods.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-700 mb-2">Preparation Methods:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {remedy.preparationMethods.map((method, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{method}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {remedy.storageInstructions && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-700">Storage: </span>
                              <span className="text-xs text-gray-600">{remedy.storageInstructions}</span>
                            </div>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <div className={`p-4 border border-${color}-100 rounded-md bg-${color}-50`}>
                      <p className="text-sm text-gray-600">Get recommendations first to see preparation instructions.</p>
                    </div>
                  )}

                  <div className={`p-4 border border-${color}-100 rounded-md bg-${color}-50`}>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">General Preparation Tips:</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Use clean, non-reactive utensils (glass, ceramic, or stainless steel) for preparation.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Store dried herbs in airtight containers away from light, heat, and moisture.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>For decoctions, use filtered or spring water when possible.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Follow specific timing instructions for maximum efficacy.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      <CardFooter className={`bg-${color}-50 border-t border-${color}-100 text-xs text-gray-500`}>
        Always consult with a healthcare professional before starting any herbal remedy regimen.
      </CardFooter>
    </Card>
  )
}
