import { koreanHerbs, ayurvedicHerbs, getHerbsBySymptom, getHerbsBySystem, getHerbsByDosha, searchHerbs } from './herbal-database'
import { koreanFormulas, ayurvedicFormulas, getFormulasBySystem, searchFormulas } from './herb-combinations'
import type { HerbalRemedyDetailed } from './herbal-database'
import type { HerbFormula } from './herb-combinations'

interface RecommendationOptions {
  system: "korean" | "ayurvedic" | "integrated"
  duration?: number // in days
  severity?: "mild" | "moderate" | "severe" // 1-10
  constitution?: "vata" | "pitta" | "kapha" | "balanced" // For Ayurvedic
  ageGroup?: "child" | "adult" | "elderly"
  season?: "spring" | "summer" | "autumn" | "winter"
  includeFormulas?: boolean
  maxResults?: number
}

interface RecommendedItem {
  type: "herb" | "formula"
  item: HerbalRemedyDetailed | HerbFormula
  matchScore: number
  reason: string
  safetyRating: number // 1-5 stars
  compatibility: string[]
  contraindications: string[]
}

const SYMPTOM_KEYWORDS: Record<string, string[]> = {
  fatigue: ["fatigue", "tired", "weak", "exhaustion", "sluggish", "low energy"],
  immunity: ["immunity", "immune", "cold", "flu", "infection", "virus", "weak resistance"],
  digestion: ["digestion", "stomach", "bloating", "indigestion", "diarrhea", "constipation"],
  joint: ["joint", "arthritis", "pain", "stiff", "inflammation"],
  sleep: ["sleep", "insomnia", "sleepless", "rest", "insomnia"],
  stress: ["stress", "anxiety", "panic", "nervous", "worry", "tension"],
  skin: ["skin", "acne", "eczema", "dermatitis", "rash", "complexion"],
  respiratory: ["cough", "asthma", "bronchitis", "respiratory", "lung", "breath"],
  women: ["period", "menstrual", "cramp", "hormone", "fertility", "menopause"],
  circulation: ["circulation", "blood", "cold", "numb", "varicose"],
  heart: ["heart", "palpitation", "blood pressure", "cholesterol"],
  liver: ["liver", "detox", "cleanse", "toxin", "hangover"],
}

function calculateSymptomMatch(herb: HerbalRemedyDetailed, symptoms: string[]): number {
  const herbSymptoms = herb.symptoms.map((s) => s.toLowerCase())
  let matchCount = 0

  symptoms.forEach((symptom) => {
    const lowerSymptom = symptom.toLowerCase()
    const matches = herbSymptoms.filter(
      (hs) =>
        hs.includes(lowerSymptom) ||
        lowerSymptom.includes(hs) ||
        (SYMPTOM_KEYWORDS[lowerSymptom] && 
          SYMPTOM_KEYWORDS[lowerSymptom].some((kw) => hs.includes(kw)))
    )
    matchCount += matches.length
  })

  return Math.min(100, (matchCount / Math.max(symptoms.length, 1)) * 100)
}

function calculateSafetyRating(
  herb: HerbalRemedyDetailed,
  contraindications: string[] = [],
  options: RecommendationOptions
): number {
  let rating = 5

  // Reduce rating based on contraindications
  herb.contraindications.forEach((contra) => {
    if (contraindications.some((c) => c.toLowerCase().includes(contra.toLowerCase()))) {
      rating -= 1.5
    }
  })

  // Consider interactions
  if (herb.interactions.length > 3) {
    rating -= 0.5
  }

  // Age consideration
  if (options.ageGroup === "child" && herb.energetics.temperature === "hot") {
    rating -= 0.5
  }

  return Math.max(1, rating)
}

function getSeverityMultiplier(severity?: string): number {
  switch (severity) {
    case "mild":
      return 0.8
    case "moderate":
      return 1.0
    case "severe":
      return 1.2
    default:
      return 1.0
  }
}

function getSeasonalAffinity(herb: HerbalRemedyDetailed, season?: string): number {
  if (!season || herb.season === "year-round") return 1.0
  if (herb.season === season) return 1.2
  return 0.9
}

export async function recommendHerbalRemedies(
  symptoms: string,
  options: RecommendationOptions = { system: "integrated" }
): Promise<RecommendedItem[]> {
  // Simulate API processing
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const symptomArray = symptoms
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0)

  const recommendations: RecommendedItem[] = []
  const processedIds = new Set<string>()
  const maxResults = options.maxResults || 15

  // Get herbs by system
  let herbs: HerbalRemedyDetailed[] = []
  if (options.system === "korean") {
    herbs = koreanHerbs
  } else if (options.system === "ayurvedic") {
    herbs = ayurvedicHerbs
  } else {
    herbs = [...koreanHerbs, ...ayurvedicHerbs]
  }

  // Score all herbs
  const scoredHerbs = herbs
    .map((herb) => ({
      herb,
      matchScore: calculateSymptomMatch(herb, symptomArray),
      safetyRating: calculateSafetyRating(herb, [], options),
      seasonalBoost: getSeasonalAffinity(herb, options.season),
      severityMultiplier: getSeverityMultiplier(options.severity),
    }))
    .filter((item) => item.matchScore > 20)
    .map((item) => ({
      ...item,
      finalScore: item.matchScore * item.seasonalBoost * item.severityMultiplier,
    }))
    .sort((a, b) => b.finalScore - a.finalScore)

  // Add top herbs
  scoredHerbs.forEach((scored) => {
    if (recommendations.length >= maxResults - 5 || processedIds.has(scored.herb.id)) return

    const compatibility = scored.herb.benefits.filter((b) =>
      symptoms.toLowerCase().includes(b.toLowerCase())
    )

    recommendations.push({
      type: "herb",
      item: scored.herb,
      matchScore: Math.round(scored.finalScore),
      reason: `Traditionally used for ${scored.herb.benefits.slice(0, 2).join(", ")}`,
      safetyRating: scored.safetyRating,
      compatibility: compatibility.slice(0, 3),
      contraindications: scored.herb.contraindications.slice(0, 2),
    })

    processedIds.add(scored.herb.id)
  })

  // Add complementary formulas if requested
  if (options.includeFormulas && recommendations.length < maxResults) {
    const formulas = options.system === "korean" ? koreanFormulas : ayurvedicFormulas
    const matchedFormulas = formulas
      .map((formula) => {
        const formulaSymptomMatches = formula.symptoms.filter((s) =>
          symptomArray.some((symptom) => s.toLowerCase().includes(symptom))
        )
        return {
          formula,
          matchScore: (formulaSymptomMatches.length / formula.symptoms.length) * 100,
        }
      })
      .filter((item) => item.matchScore > 25)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3)

    matchedFormulas.forEach((matched) => {
      if (recommendations.length >= maxResults) return

      const compatibility = matched.formula.benefits.filter((b) =>
        symptoms.toLowerCase().includes(b.toLowerCase())
      )

      recommendations.push({
        type: "formula",
        item: matched.formula,
        matchScore: Math.round(matched.matchScore),
        reason: `Traditional combination for ${matched.formula.benefits[0]}`,
        safetyRating: 4,
        compatibility: compatibility.slice(0, 3),
        contraindications: matched.formula.contraindications.slice(0, 2),
      })
    })
  }

  return recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, maxResults)
}

export async function searchBySymptom(
  symptom: string,
  system: "korean" | "ayurvedic" | "all" = "all"
): Promise<HerbalRemedyDetailed[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const allHerbs = system === "all" ? [...koreanHerbs, ...ayurvedicHerbs] : 
                   system === "korean" ? koreanHerbs : ayurvedicHerbs

  return allHerbs.filter((herb) =>
    herb.symptoms.some((s) => s.toLowerCase().includes(symptom.toLowerCase()))
  )
}

export async function searchHerbsAdvanced(
  query: string,
  filters?: {
    system?: "korean" | "ayurvedic"
    dosha?: "vata" | "pitta" | "kapha"
    temperature?: "cold" | "cool" | "neutral" | "warm" | "hot"
    category?: string
  }
): Promise<HerbalRemedyDetailed[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  let results = searchHerbs(query)

  if (filters?.system === "korean") {
    results = results.filter((h) => h.system === "korean" || h.system === "both")
  } else if (filters?.system === "ayurvedic") {
    results = results.filter((h) => h.system === "ayurvedic" || h.system === "both")
  }

  if (filters?.dosha) {
    results = results.filter((h) => h.energetics.dosha === filters.dosha)
  }

  if (filters?.temperature) {
    results = results.filter((h) => h.energetics.temperature === filters.temperature)
  }

  if (filters?.category) {
    results = results.filter((h) =>
      h.category.toLowerCase().includes(filters.category!.toLowerCase())
    )
  }

  return results
}

export async function getComplementaryHerbs(
  herbId: string
): Promise<{ herb: HerbalRemedyDetailed; synergy: string }[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const targetHerb = [...koreanHerbs, ...ayurvedicHerbs].find((h) => h.id === herbId)
  if (!targetHerb) return []

  const allHerbs = [...koreanHerbs, ...ayurvedicHerbs]
  const complementary = allHerbs
    .filter((h) => h.id !== herbId && h.system === targetHerb.system)
    .map((herb) => {
      const commonBenefits = herb.benefits.filter((b) => targetHerb.benefits.includes(b))
      const synergy = commonBenefits.length > 0 ? `Combines for ${commonBenefits[0]}` : "Complementary actions"
      return { herb, synergy }
    })
    .filter((item) => item.herb.benefits.some((b) => targetHerb.benefits.includes(b)))
    .slice(0, 5)

  return complementary
}

export async function getHerbsByDoshaBalance(
  dosha: "vata" | "pitta" | "kapha"
): Promise<HerbalRemedyDetailed[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getHerbsByDosha(dosha)
}

export function calculateInteractionRisk(
  herbs: HerbalRemedyDetailed[],
  medications: string[] = []
): { riskLevel: "low" | "moderate" | "high"; warnings: string[] } {
  const warnings: string[] = []
  const allInteractions = herbs.flatMap((h) => h.interactions)

  medications.forEach((med) => {
    allInteractions.forEach((interaction) => {
      if (interaction.toLowerCase().includes(med.toLowerCase())) {
        warnings.push(`Potential interaction with ${med}: ${interaction}`)
      }
    })
  })

  let riskLevel: "low" | "moderate" | "high" = "low"
  if (warnings.length > 0) riskLevel = "moderate"
  if (warnings.length > 3) riskLevel = "high"

  return { riskLevel, warnings }
}
