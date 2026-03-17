import { create } from "zustand"
import { persist } from "zustand/middleware"
import { addDays } from "date-fns"

// Types
export type HealthProfile = {
  name: string
  dateOfBirth: Date | null
  healthConcerns: string
  height: string
  weight: string
  dietaryPreference: string
  conditions: string[]
  medications: string
}

export type Symptom = {
  id: string
  date: Date
  title: string
  description: string
  severity: number
  duration: string
  remediesTried: string[]
  effectiveness: "effective" | "partial" | "none"
}

export type HerbInteraction = {
  herb: string
  medication: string
  safe: boolean
  message: string
  details: string
  source?: string
}

export type Remedy = {
  id: string
  name: string
  system: "korean" | "ayurvedic" | "both"
  description: string
  usedFor: string[]
  dateAdded: Date
  effectiveness: number // 1-5
  notes: string
}

// Store
type State = {
  healthProfile: HealthProfile
  symptoms: Symptom[]
  interactions: HerbInteraction[]
  savedRemedies: Remedy[]
  wellnessScore: number

  // Actions
  updateHealthProfile: (profile: Partial<HealthProfile>) => void
  addSymptom: (symptom: Omit<Symptom, "id">) => void
  updateSymptom: (id: string, symptom: Partial<Symptom>) => void
  deleteSymptom: (id: string) => void
  checkInteraction: (herb: string, medication: string) => HerbInteraction
  addRemedy: (remedy: Omit<Remedy, "id" | "dateAdded">) => void
  updateRemedy: (id: string, remedy: Partial<Remedy>) => void
  deleteRemedy: (id: string) => void
  calculateWellnessScore: () => number
}

// Interaction data
const interactionDatabase: Record<
  string,
  Record<string, { safe: boolean; message: string; details: string; source?: string }>
> = {
  ginseng: {
    warfarin: {
      safe: false,
      message: "Potential interaction detected",
      details: "Ginseng may decrease the effectiveness of warfarin, potentially reducing its blood-thinning effects.",
      source: "Journal of Clinical Pharmacy and Therapeutics, 2018",
    },
    metformin: {
      safe: true,
      message: "No significant interaction",
      details: "Some studies suggest ginseng may actually complement metformin's effects on blood sugar control.",
    },
    ssri: {
      safe: true,
      message: "Generally safe combination",
      details: "No major interactions reported, but monitor for increased stimulant effects.",
    },
  },
  ashwagandha: {
    thyroid: {
      safe: false,
      message: "Use with caution",
      details: "Ashwagandha may increase thyroid hormone levels, potentially interfering with thyroid medications.",
      source: "Journal of Ayurveda and Integrative Medicine, 2020",
    },
    sedatives: {
      safe: false,
      message: "Potential interaction detected",
      details: "May increase sedative effects when combined with sedative medications.",
    },
  },
  turmeric: {
    warfarin: {
      safe: false,
      message: "Potential interaction detected",
      details: "Turmeric may enhance the blood-thinning effects of warfarin, increasing bleeding risk.",
      source: "Alternative Medicine Review, 2019",
    },
    antidiabetics: {
      safe: false,
      message: "Monitor closely",
      details: "May enhance blood sugar lowering effects, potentially causing hypoglycemia.",
    },
  },
  licorice: {
    diuretics: {
      safe: false,
      message: "Potential interaction detected",
      details: "May cause increased potassium loss when combined with diuretics.",
      source: "European Journal of Pharmacology, 2017",
    },
    levothyroxine: {
      safe: false,
      message: "Potential interaction detected",
      details: "May interfere with thyroid hormone absorption.",
    },
    antihypertensives: {
      safe: false,
      message: "Use with caution",
      details: "May counteract the effects of blood pressure medications.",
    },
  },
  st_johns_wort: {
    ssri: {
      safe: false,
      message: "Serious interaction potential",
      details:
        "Combining St. John's Wort with SSRIs may increase risk of serotonin syndrome, a potentially life-threatening condition.",
      source: "British Journal of Clinical Pharmacology, 2021",
    },
    birth_control: {
      safe: false,
      message: "Serious interaction potential",
      details: "May reduce effectiveness of hormonal contraceptives.",
    },
    immunosuppressants: {
      safe: false,
      message: "Serious interaction potential",
      details: "May reduce blood levels of immunosuppressant drugs.",
    },
  },
}

// Sample symptoms for demo
const sampleSymptoms: Symptom[] = [
  {
    id: "1",
    date: new Date(),
    title: "Headache & Fatigue",
    description:
      "Woke up with a dull headache that got worse after lunch. Also feeling tired despite sleeping 8 hours.",
    severity: 6,
    duration: "4 hours",
    remediesTried: ["Ginger tea", "Rest"],
    effectiveness: "partial",
  },
  {
    id: "2",
    date: addDays(new Date(), -1),
    title: "Digestive Discomfort",
    description: "Mild bloating and discomfort after dinner. Took ginger tea which helped somewhat.",
    severity: 4,
    duration: "2 hours",
    remediesTried: ["Ginger tea"],
    effectiveness: "partial",
  },
  {
    id: "3",
    date: addDays(new Date(), -2),
    title: "Joint Pain",
    description: "Woke up with stiffness in knees and ankles. Pain increased during the day, especially when walking.",
    severity: 7,
    duration: "All day",
    remediesTried: ["Turmeric tea", "Warm compress"],
    effectiveness: "partial",
  },
]

// Create store
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      healthProfile: {
        name: "",
        dateOfBirth: null,
        healthConcerns: "",
        height: "",
        weight: "",
        dietaryPreference: "none",
        conditions: [],
        medications: "",
      },
      symptoms: sampleSymptoms,
      interactions: [],
      savedRemedies: [],
      wellnessScore: 72,

      updateHealthProfile: (profile) =>
        set((state) => ({
          healthProfile: { ...state.healthProfile, ...profile },
        })),

      addSymptom: (symptom) =>
        set((state) => ({
          symptoms: [
            {
              ...symptom,
              id: Math.random().toString(36).substring(2, 9),
            },
            ...state.symptoms,
          ],
        })),

      updateSymptom: (id, symptom) =>
        set((state) => ({
          symptoms: state.symptoms.map((s) => (s.id === id ? { ...s, ...symptom } : s)),
        })),

      deleteSymptom: (id) =>
        set((state) => ({
          symptoms: state.symptoms.filter((s) => s.id !== id),
        })),

      checkInteraction: (herb, medication) => {
        const interaction = interactionDatabase[herb]?.[medication]
        const result = interaction
          ? {
              herb,
              medication,
              ...interaction,
            }
          : {
              herb,
              medication,
              safe: true,
              message: "No known significant interactions",
              details:
                "Current research does not indicate significant interactions between these substances. However, individual responses may vary.",
            }

        set((state) => ({
          interactions: [result, ...state.interactions.slice(0, 9)],
        }))

        return result
      },

      addRemedy: (remedy) =>
        set((state) => ({
          savedRemedies: [
            {
              ...remedy,
              id: Math.random().toString(36).substring(2, 9),
              dateAdded: new Date(),
            },
            ...state.savedRemedies,
          ],
        })),

      updateRemedy: (id, remedy) =>
        set((state) => ({
          savedRemedies: state.savedRemedies.map((r) => (r.id === id ? { ...r, ...remedy } : r)),
        })),

      deleteRemedy: (id) =>
        set((state) => ({
          savedRemedies: state.savedRemedies.filter((r) => r.id !== id),
        })),

      calculateWellnessScore: () => {
        // In a real app, this would use a complex algorithm based on symptoms, remedies, etc.
        const state = get()
        const baseScore = 70

        // Factors that improve score
        const positiveFactors = [
          state.healthProfile.name ? 2 : 0, // Has created profile
          state.healthProfile.healthConcerns ? 1 : 0, // Has added health concerns
          state.savedRemedies.length * 0.5, // Number of remedies tried
          state.savedRemedies.filter((r) => r.effectiveness >= 4).length * 1, // Effective remedies
          state.symptoms.length > 0 ? 2 : 0, // Is tracking symptoms
        ]

        // Factors that decrease score
        const negativeFactors = [
          state.symptoms.filter((s) => s.severity >= 7).length * 0.5, // Severe symptoms
          state.symptoms.filter((s) => new Date().getTime() - new Date(s.date).getTime() < 7 * 24 * 60 * 60 * 1000)
            .length * 0.3, // Recent symptoms
        ]

        const positiveSum = positiveFactors.reduce((sum, factor) => sum + factor, 0)
        const negativeSum = negativeFactors.reduce((sum, factor) => sum + factor, 0)

        const newScore = Math.min(100, Math.max(0, baseScore + positiveSum - negativeSum))

        set({ wellnessScore: Math.round(newScore) })
        return Math.round(newScore)
      },
    }),
    {
      name: "traditional-medicine-storage",
    },
  ),
)
