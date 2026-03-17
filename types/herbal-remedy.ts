export interface HerbalRemedy {
  name: string
  description: string
  traditionalUses: string
  preparation: string
  origin?: string
  safetyRating?: number // 1-5 scale
  matchScore?: number // percentage match to symptoms
  warnings?: string
  interactions?: string[]
  researchBasis?: string
  dosage?: string
  storageInstructions?: string
}
