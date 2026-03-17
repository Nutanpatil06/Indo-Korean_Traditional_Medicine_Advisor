"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// Utility functions for date handling
const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isYesterday = (date: Date) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.toDateString() === yesterday.toDateString()
}

const differenceInDays = (date1: Date, date2: Date) => {
  const oneDay = 24 * 60 * 60 * 1000
  return Math.round((date1.getTime() - date2.getTime()) / oneDay)
}

const format = (date: Date, formatStr: string) => {
  if (formatStr === "PPP") {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }
  return date.toLocaleDateString()
}
import { cn } from "@/lib/utils"
import {
  UserCircle,
  CalendarIcon,
  Search,
  BookOpen,
  Map,
  MessageSquare,
  BarChart,
  Zap,
  ChevronRight,
  CalendarDays,
  Clock,
  AlertCircle,
  Check,
  Plus,
  Trash2,
  Edit,
} from "lucide-react"
import { gsap } from "gsap"
import styled from "@emotion/styled"
import { useStore, type Symptom } from "@/lib/store"
import { Line, Pie, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js"
import HerbModelViewer from "@/components/models/HerbModel"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title)

// Styled components with Emotion
const FeatureCard = styled(Card)`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
`

const IconWrapper = styled.div`
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.1);
    background-color: #e6f7e6;
  }
`

const FeatureImage = styled.div`
  overflow: hidden;
  border-radius: 0.375rem;
  
  img {
    transition: transform 0.5s ease;
  }
  
  ${FeatureCard}:hover & img {
    transform: scale(1.08);
  }
`

const FeatureButton = styled(Button)`
  transition: color 0.3s ease, transform 0.3s ease;
  
  ${FeatureCard}:hover & {
    color: #15803d;
    transform: translateX(3px);
  }
`

const SymptomCard = styled.div`
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f9f0;
  }
`

export function FeatureHighlights() {
  // Refs for GSAP animations
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  // State from Zustand store
  const {
    healthProfile,
    updateHealthProfile,
    symptoms,
    addSymptom,
    updateSymptom,
    deleteSymptom,
    checkInteraction,
    wellnessScore,
    calculateWellnessScore,
    savedRemedies,
    addRemedy,
  } = useStore()

  // Local state
  const [date, setDate] = useState<Date | undefined>(
    healthProfile.dateOfBirth instanceof Date ? healthProfile.dateOfBirth : undefined
  )
  const [selectedHerb, setSelectedHerb] = useState<string | null>(null)
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null)
  const [interactionResult, setInteractionResult] = useState<any | null>(null)
  const [newSymptom, setNewSymptom] = useState<Partial<Symptom>>({
    title: "",
    description: "",
    severity: 5,
    duration: "",
    remediesTried: [],
    effectiveness: "partial",
  })
  const [showAddSymptom, setShowAddSymptom] = useState(false)
  const [modelLoaded, setModelLoaded] = useState(false)

  // GSAP animations
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2 + index * 0.1,
            ease: "power2.out",
          },
        )
      })
    }
  }, [])

  // Calculate wellness score on mount
  useEffect(() => {
    calculateWellnessScore()
  }, [calculateWellnessScore])

  // Handle health profile update
  const handleProfileUpdate = () => {
    updateHealthProfile({
      name: (document.getElementById("name") as HTMLInputElement)?.value || "",
      dateOfBirth: date,
      healthConcerns: (document.getElementById("health-concerns") as HTMLInputElement)?.value || "",
      height: (document.getElementById("height") as HTMLInputElement)?.value || "",
      weight: (document.getElementById("weight") as HTMLInputElement)?.value || "",
      medications: (document.getElementById("medications") as HTMLInputElement)?.value || "",
    })

    // Show success message
    const successMessage = document.getElementById("profile-success")
    if (successMessage) {
      successMessage.classList.remove("hidden")
      setTimeout(() => {
        successMessage.classList.add("hidden")
      }, 3000)
    }
  }

  // Handle herb interaction check
  const handleInteractionCheck = () => {
    if (selectedHerb && selectedMedication) {
      const result = checkInteraction(selectedHerb, selectedMedication)
      setInteractionResult(result)

      // Animate the result appearance
      const resultElement = document.getElementById("interaction-result")
      if (resultElement) {
        gsap.fromTo(resultElement, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      }
    }
  }

  // Handle adding a new symptom
  const handleAddSymptom = () => {
    if (newSymptom.title && newSymptom.description) {
      addSymptom({
        date: new Date(),
        title: newSymptom.title,
        description: newSymptom.description,
        severity: newSymptom.severity || 5,
        duration: newSymptom.duration || "Unknown",
        remediesTried: newSymptom.remediesTried || [],
        effectiveness: newSymptom.effectiveness || "partial",
      })

      // Reset form
      setNewSymptom({
        title: "",
        description: "",
        severity: 5,
        duration: "",
        remediesTried: [],
        effectiveness: "partial",
      })
      setShowAddSymptom(false)

      // Recalculate wellness score
      calculateWellnessScore()
    }
  }

  // Format date for display
  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date
      if (!dateObj || isNaN(dateObj.getTime())) return "Unknown date"
      
      if (isToday(dateObj)) return "Today"
      if (isYesterday(dateObj)) return "Yesterday"

      const days = differenceInDays(new Date(), dateObj)
      if (days < 7) return `${days} days ago`

      return format(dateObj, "PPP")
    } catch {
      return "Unknown date"
    }
  }

  // Chart data for symptom frequency
  const symptomChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Symptom Frequency",
        data: [2, 3, 1, 4, 2, 1, 0],
        backgroundColor: "rgba(76, 175, 80, 0.6)",
        borderColor: "rgba(76, 175, 80, 1)",
        borderWidth: 1,
      },
    ],
  }

  // Chart data for remedy effectiveness
  const remedyChartData = {
    labels: ["Effective", "Partial", "No Effect"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["rgba(76, 175, 80, 0.7)", "rgba(255, 193, 7, 0.7)", "rgba(244, 67, 54, 0.7)"],
        borderColor: ["rgba(76, 175, 80, 1)", "rgba(255, 193, 7, 1)", "rgba(244, 67, 54, 1)"],
        borderWidth: 1,
      },
    ],
  }

  // Chart data for wellness trend
  const wellnessTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Wellness Score",
        data: [60, 65, 62, 68, 70, wellnessScore],
        fill: false,
        backgroundColor: "rgba(76, 175, 80, 0.8)",
        borderColor: "rgba(76, 175, 80, 1)",
        tension: 0.4,
      },
    ],
  }

  const features = [
    {
      icon: <UserCircle className="h-8 w-8 text-green-600" />,
      title: "Personalized Health Profiles",
      description: "Create detailed health profiles to receive more accurate and personalized herbal recommendations.",
      image: "/images/health-profile.jpg",
      component: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" defaultValue={healthProfile.name} />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date && date instanceof Date && !isNaN(date.getTime())
                      ? format(date, "PPP")
                      : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="health-concerns">Primary Health Concerns</Label>
            <Input
              id="health-concerns"
              placeholder="e.g., Digestive issues, sleep problems, stress"
              defaultValue={healthProfile.healthConcerns}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" placeholder="175" defaultValue={healthProfile.height} />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" placeholder="70" defaultValue={healthProfile.weight} />
            </div>
          </div>

          <div>
            <Label>Dietary Preferencesences</Label>
            <Select
              defaultValue={healthProfile.dietaryPreference}
              onValueChange={(value) => updateHealthProfile({ dietaryPreference: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select dietary preference" />
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
            <Label>Pre-existing Conditions</Label>
            <div className="grid grid-cols-2 gap-2">
              {["Diabetes", "Hypertension", "Heart Disease", "Thyroid Issues", "Allergies", "Asthma"].map(
                (condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Switch
                      id={`condition-${condition}`}
                      checked={healthProfile.conditions.includes(condition)}
                      onCheckedChange={(checked) => {
                        const newConditions = checked
                          ? [...healthProfile.conditions, condition]
                          : healthProfile.conditions.filter((c) => c !== condition)
                        updateHealthProfile({ conditions: newConditions })
                      }}
                    />
                    <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="medications">Current Medications</Label>
            <Input
              id="medications"
              placeholder="List any medications you're currently taking"
              defaultValue={healthProfile.medications}
            />
          </div>

          <div id="profile-success" className="p-3 bg-green-100 text-green-800 rounded-md hidden">
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <span>Health profile updated successfully!</span>
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleProfileUpdate}>
            Save Health Profile
          </Button>
        </div>
      ),
    },
    {
      icon: <CalendarIcon className="h-8 w-8 text-green-600" />,
      title: "Symptom Tracker",
      description: "Track your symptoms over time to monitor the effectiveness of remedies and identify patterns.",
      image: "/images/symptom-tracker.jpg",
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Symptom Log</h4>
              <p className="text-sm text-gray-500">Record and track your symptoms</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowAddSymptom(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </div>

          {showAddSymptom && (
            <div className="p-4 border border-green-200 rounded-md bg-green-50 space-y-3">
              <h4 className="font-medium text-green-800">New Symptom Entry</h4>

              <div>
                <Label htmlFor="symptom-title">Symptom Title</Label>
                <Input
                  id="symptom-title"
                  placeholder="e.g., Headache, Fatigue, Digestive Issues"
                  value={newSymptom.title}
                  onChange={(e) => setNewSymptom({ ...newSymptom, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="symptom-description">Description</Label>
                <Input
                  id="symptom-description"
                  placeholder="Describe your symptoms in detail"
                  value={newSymptom.description}
                  onChange={(e) => setNewSymptom({ ...newSymptom, description: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="symptom-severity">Severity (1-10)</Label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newSymptom.severity || 5}
                    onChange={(e) => setNewSymptom({ ...newSymptom, severity: Number.parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="w-8 text-center">{newSymptom.severity || 5}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="symptom-duration">Duration</Label>
                <Input
                  id="symptom-duration"
                  placeholder="e.g., 2 hours, All day"
                  value={newSymptom.duration}
                  onChange={(e) => setNewSymptom({ ...newSymptom, duration: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="symptom-remedies">Remedies Tried (comma separated)</Label>
                <Input
                  id="symptom-remedies"
                  placeholder="e.g., Ginger tea, Rest, Meditation"
                  value={newSymptom.remediesTried?.join(", ") || ""}
                  onChange={(e) =>
                    setNewSymptom({
                      ...newSymptom,
                      remediesTried: e.target.value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>

              <div>
                <Label>Effectiveness</Label>
                <Select
                  value={newSymptom.effectiveness || "partial"}
                  onValueChange={(value: any) => setNewSymptom({ ...newSymptom, effectiveness: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select effectiveness" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="effective">Effective</SelectItem>
                    <SelectItem value="partial">Partially Effective</SelectItem>
                    <SelectItem value="none">Not Effective</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddSymptom(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleAddSymptom}
                  disabled={!newSymptom.title || !newSymptom.description}
                >
                  Save Entry
                </Button>
              </div>
            </div>
          )}

          <div className="border rounded-md">
            {symptoms.length > 0 ? (
              symptoms.map((symptom, index) => (
                <SymptomCard key={symptom.id} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-green-600" />
                        <span className="font-medium">{formatDate(symptom.date)}</span>
                      </div>
                      <h4 className="font-medium mt-2">{symptom.title}</h4>
                      <div className="flex items-center mt-1 flex-wrap gap-1">
                        <span
                          className={`text-sm ${
                            symptom.severity >= 7
                              ? "bg-red-100 text-red-800"
                              : symptom.severity >= 4
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          } px-2 py-0.5 rounded-full`}
                        >
                          Severity: {symptom.severity}/10
                        </span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Duration: {symptom.duration}
                        </span>
                        {symptom.effectiveness && (
                          <span
                            className={`text-sm ${
                              symptom.effectiveness === "effective"
                                ? "bg-green-100 text-green-800"
                                : symptom.effectiveness === "partial"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            } px-2 py-0.5 rounded-full`}
                          >
                            {symptom.effectiveness === "effective"
                              ? "Effective"
                              : symptom.effectiveness === "partial"
                                ? "Partially Effective"
                                : "Not Effective"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => deleteSymptom(symptom.id)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{symptom.description}</p>
                  {symptom.remediesTried && symptom.remediesTried.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-700">Remedies tried: </span>
                      <span className="text-xs text-gray-600">{symptom.remediesTried.join(", ")}</span>
                    </div>
                  )}
                </SymptomCard>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <div className="mb-2">No symptoms recorded yet.</div>
                <Button variant="outline" size="sm" onClick={() => setShowAddSymptom(true)}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Your First Symptom
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="outline">View All Entries</Button>
            <Button variant="outline">
              <BarChart className="mr-2 h-4 w-4" />
              View Trends
            </Button>
          </div>
        </div>
      ),
    },
    {
      icon: <Search className="h-8 w-8 text-green-600" />,
      title: "Herb Interaction Checker",
      description: "Check for potential interactions between herbs, supplements, and medications.",
      image: "/images/herb-interaction.jpg",
      component: (
        <div className="space-y-4">
          <div className="mb-4">
            <HerbModelViewer herbType={selectedHerb || "ginseng"} onLoad={() => setModelLoaded(true)} />
          </div>

          <div>
            <Label htmlFor="herb-select">Select Herb or Supplement</Label>
            <Select value={selectedHerb || ""} onValueChange={setSelectedHerb}>
              <SelectTrigger id="herb-select">
                <SelectValue placeholder="Choose an herb or supplement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ginseng">Ginseng (인삼, Insam)</SelectItem>
                <SelectItem value="ashwagandha">Ashwagandha (अश्वगंधा)</SelectItem>
                <SelectItem value="turmeric">Turmeric (हल्दी, Haldi)</SelectItem>
                <SelectItem value="licorice">Licorice Root (감초, Gamcho)</SelectItem>
                <SelectItem value="st_johns_wort">St. John's Wort</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="medication-select">Select Medication</Label>
            <Select value={selectedMedication || ""} onValueChange={setSelectedMedication}>
              <SelectTrigger id="medication-select">
                <SelectValue placeholder="Choose a medication" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warfarin">Warfarin (Blood Thinner)</SelectItem>
                <SelectItem value="ssri">SSRIs (Antidepressants)</SelectItem>
                <SelectItem value="statins">Statins (Cholesterol Medication)</SelectItem>
                <SelectItem value="metformin">Metformin (Diabetes Medication)</SelectItem>
                <SelectItem value="levothyroxine">Levothyroxine (Thyroid Medication)</SelectItem>
                <SelectItem value="diuretics">Diuretics (Water Pills)</SelectItem>
                <SelectItem value="antihypertensives">Antihypertensives (Blood Pressure Medication)</SelectItem>
                <SelectItem value="thyroid">Thyroid Medications</SelectItem>
                <SelectItem value="sedatives">Sedatives</SelectItem>
                <SelectItem value="antidiabetics">Antidiabetic Medications</SelectItem>
                <SelectItem value="birth_control">Birth Control Pills</SelectItem>
                <SelectItem value="immunosuppressants">Immunosuppressants</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleInteractionCheck}
            disabled={!selectedHerb || !selectedMedication}
          >
            Check Interactions
          </Button>

          {interactionResult && (
            <div
              id="interaction-result"
              className={`p-4 rounded-md ${interactionResult.safe ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}
            >
              <div className="flex items-start">
                {interactionResult.safe ? (
                  <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-medium ${interactionResult.safe ? "text-green-800" : "text-amber-800"}`}>
                    {interactionResult.message}
                  </h4>
                  <p className={`text-sm mt-1 ${interactionResult.safe ? "text-green-700" : "text-amber-700"}`}>
                    {interactionResult.details}
                  </p>
                  {interactionResult.source && (
                    <p className="text-xs mt-2 text-gray-600">Source: {interactionResult.source}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 mt-2">
            Note: This tool provides general information based on available research. Always consult with a healthcare
            professional for personalized advice.
          </div>
        </div>
      ),
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Educational Resources",
      description: "Access comprehensive educational content about traditional medicine principles and practices.",
      image: "/images/education-resources.jpg",
      component: (
        <div className="space-y-4">
          <Tabs defaultValue="korean">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="korean">Korean Medicine</TabsTrigger>
              <TabsTrigger value="ayurvedic">Ayurvedic Medicine</TabsTrigger>
            </TabsList>
            <TabsContent value="korean" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-md p-4 hover:bg-green-50 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src="/images/health-profile.jpg"
                        alt="Yin and Yang"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Principles of Yin and Yang</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Learn about the foundational concept of balance in Korean traditional medicine.
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">15 min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 hover:bg-green-50 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src="/images/health-profile.jpg"
                        alt="Sasang Constitutional Medicine"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Sasang Constitutional Medicine</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Discover the four constitutional types in Korean medicine and how they guide treatment.
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">20 min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 hover:bg-green-50 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src="/images/health-profile.jpg"
                        alt="Herbal Formulas"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Common Herbal Formulas</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Explore traditional Korean herbal formulations and their applications.
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">25 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Korean Medicine Resources
              </Button>
            </TabsContent>

            <TabsContent value="ayurvedic" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-md p-4 hover:bg-amber-50 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src="/images/health-profile.jpg"
                        alt="Doshas"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-800">Understanding the Three Doshas</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Learn about Vata, Pitta, and Kapha - the three fundamental energies in Ayurveda.
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">18 min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 hover:bg-amber-50 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src="/images/health-profile.jpg"
                        alt="Dinacharya"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-800">Dinacharya: Daily Ayurvedic Routine</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Discover the ideal daily routine according to Ayurvedic principles for optimal health.
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">15 min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 hover:bg-amber-50 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src="/images/health-profile.jpg"
                        alt="Rasayana"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-800">Rasayana: The Science of Rejuvenation</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Explore Ayurvedic practices for longevity, vitality, and rejuvenation.
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">22 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Ayurvedic Resources
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      ),
    },
    {
      icon: <Map className="h-8 w-8 text-green-600" />,
      title: "Practitioner Finder",
      description: "Find certified traditional medicine practitioners in your area for in-person consultations.",
      image: "/images/practitioner-finder.jpg",
      component: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input placeholder="Enter your location" className="flex-1" defaultValue="Seoul, South Korea" />
            <Select defaultValue="50">
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 km</SelectItem>
                <SelectItem value="25">25 km</SelectItem>
                <SelectItem value="50">50 km</SelectItem>
                <SelectItem value="100">100 km</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Practitioner Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Practitioners</SelectItem>
                <SelectItem value="korean">Korean Medicine Doctor</SelectItem>
                <SelectItem value="ayurvedic">Ayurvedic Practitioner</SelectItem>
                <SelectItem value="acupuncture">Acupuncturist</SelectItem>
                <SelectItem value="herbalist">Herbalist</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="border rounded-md divide-y">
            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img
                    src="/images/health-profile.jpg"
                    alt="Dr. Kim"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Dr. Min-Ji Kim</h4>
                    <span className="text-sm text-gray-500">2.3 km away</span>
                  </div>
                  <p className="text-sm text-gray-600">Korean Medicine Doctor, Acupuncturist</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">4.9 (128 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img
                    src="/images/health-profile.jpg"
                    alt="Dr. Park"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Dr. Ji-Hoon Park</h4>
                    <span className="text-sm text-gray-500">3.7 km away</span>
                  </div>
                  <p className="text-sm text-gray-600">Korean Medicine Doctor, Herbalist</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-4 h-4 ${star <= 4 ? "text-yellow-500" : "text-gray-300"}`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">4.2 (95 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img
                    src="/images/health-profile.jpg"
                    alt="Dr. Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Dr. Arjun Sharma</h4>
                    <span className="text-sm text-gray-500">5.1 km away</span>
                  </div>
                  <p className="text-sm text-gray-600">Ayurvedic Practitioner, Yoga Therapist</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-4 h-4 ${star <= 5 ? "text-yellow-500" : "text-gray-300"}`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">4.8 (112 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            View All Practitioners
          </Button>
        </div>
      ),
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      title: "Community Forum",
      description: "Connect with others interested in traditional medicine to share experiences and knowledge.",
      image: "/images/community-forum.jpg",
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Popular Discussions</h4>
              <p className="text-sm text-gray-500">Join conversations about traditional medicine</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">Start New Topic</Button>
          </div>

          <div className="border rounded-md divide-y">
            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between">
                <h4 className="font-medium text-green-800">Ginseng vs Ashwagandha for Energy</h4>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Comparing the effects of Korean Ginseng and Ayurvedic Ashwagandha for boosting energy levels.
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="/images/herb-garden.jpg"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="/images/herb-garden.jpg"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="/images/herb-garden.jpg"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">32 participants</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">48 replies</span>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between">
                <h4 className="font-medium text-green-800">Success with Traditional Remedies for Allergies</h4>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Members sharing their experiences using traditional remedies to manage seasonal allergies.
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="/images/herb-garden.jpg"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="/images/herb-garden.jpg"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">19 participants</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">27 replies</span>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between">
                <h4 className="font-medium text-green-800">Integrating Traditional Medicine with Modern Healthcare</h4>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Hot Topic</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Discussion on how to effectively combine traditional medicine approaches with conventional healthcare.
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="/images/herb-garden.jpg"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="/images/herb-garden.jpg"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="/images/herb-garden.jpg"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">54 participants</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">86 replies</span>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            View All Discussions
          </Button>
        </div>
      ),
    },
    {
      icon: <BarChart className="h-8 w-8 text-green-600" />,
      title: "Progress Analytics",
      description: "View detailed analytics on your health journey and the effectiveness of recommended remedies.",
      image: "/images/analytics-dashboard.jpg",
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Your Health Analytics</h4>
              <p className="text-sm text-gray-500">Track your progress over time</p>
            </div>
            <Select defaultValue="month">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="quarter">Past 3 Months</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md p-4">
            <h5 className="text-sm font-medium mb-2">Symptom Frequency</h5>
            <div className="h-40 bg-gray-50 rounded-md p-2">
              <Bar
                data={symptomChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 5,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <h5 className="text-sm font-medium mb-2">Remedy Effectiveness</h5>
              <div className="h-32 bg-gray-50 rounded-md p-2">
                <Pie
                  data={remedyChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span>Effective (65%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-1"></div>
                  <span>Partial (25%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
                  <span>No Effect (10%)</span>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h5 className="text-sm font-medium mb-2">Wellness Score</h5>
              <div className="flex items-center justify-center h-32">
                <div className="relative w-24 h-24">
                  {/* Circular progress */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-green-600"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * wellnessScore) / 100}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-800">{wellnessScore}</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-500">Your wellness score has improved by 12 points this month</span>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h5 className="text-sm font-medium mb-2">Wellness Trend</h5>
            <div className="h-40 bg-gray-50 rounded-md p-2">
              <Line
                data={wellnessTrendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: false,
                      min: 50,
                      max: 100,
                      ticks: {
                        stepSize: 10,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => calculateWellnessScore()}>
            Recalculate Wellness Score
          </Button>
        </div>
      ),
    },
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: "AI-Powered Insights",
      description: "Benefit from our advanced AI that continuously learns from research and user feedback.",
      image: "/images/ai-insights.jpg",
      component: (
        <div className="space-y-4">
          <div className="border rounded-md p-4 bg-gradient-to-r from-green-50 to-teal-50">
            <div className="flex items-start">
              <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-green-800">Personalized Insights</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Based on your symptom patterns and response to remedies, our AI suggests you may benefit from:
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Increasing hydration</p>
                      <p className="text-xs text-gray-600">
                        Your symptom patterns suggest mild dehydration may be contributing to your headaches.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Trying Chrysanthemum tea</p>
                      <p className="text-xs text-gray-600">
                        Users with similar profiles have reported a 78% improvement in similar symptoms.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Reducing screen time before bed</p>
                      <p className="text-xs text-gray-600">
                        Your sleep quality may be affecting your energy levels during the day.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Research-Based Recommendations</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <img
                    src="/images/health-profile.jpg"
                    alt="Research"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="text-sm font-medium">New Research on Turmeric</h5>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Recent studies show enhanced bioavailability when combined with black pepper. Consider this
                    combination for better results.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <img
                    src="/images/health-profile.jpg"
                    alt="Research"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="text-sm font-medium">Ginseng Timing Matters</h5>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Our analysis shows taking ginseng in the morning rather than evening improves effectiveness for
                    energy by 43%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4 bg-purple-50">
            <h4 className="font-medium mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-1 text-purple-600"
              >
                <path d="M16.5 7.5h-9v9h9v-9z" />
                <path
                  fillRule="evenodd"
                  d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                  clipRule="evenodd"
                />
              </svg>
              AI Learning from Your Feedback
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Our AI has analyzed your feedback on previous recommendations to improve future suggestions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Preference for morning remedies</span>
                <span className="text-purple-600 font-medium">Learned</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Sensitivity to strong herbs</span>
                <span className="text-purple-600 font-medium">Learned</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Preference for tea over capsules</span>
                <span className="text-purple-600 font-medium">Learned</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
            Get Personalized AI Insights
          </Button>
        </div>
      ),
    },
  ]

  return (
    <section ref={sectionRef} className="mb-16">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Comprehensive Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <FeatureCard ref={(el) => (cardsRef.current[index] = el)} className="border-green-100 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <IconWrapper className="mb-4 p-3 bg-green-50 rounded-full">{feature.icon}</IconWrapper>
                    <FeatureImage className="w-full h-32 mb-4">
                      <img
                        src={feature.image || "/images/herb-garden.jpg"}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </FeatureImage>
                    <h3 className="font-medium text-green-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                    <FeatureButton variant="link" className="mt-2 text-green-600">
                      Try Feature
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </FeatureButton>
                  </div>
                </CardContent>
              </FeatureCard>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-2">{feature.icon}</div>
                  {feature.title}
                </DialogTitle>
                <DialogDescription>{feature.description}</DialogDescription>
              </DialogHeader>
              {feature.component}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  )
}
