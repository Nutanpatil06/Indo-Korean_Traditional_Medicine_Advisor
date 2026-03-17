export interface HerbFormula {
  id: string
  name: string
  system: "korean" | "ayurvedic"
  category: string
  description: string
  ingredients: {
    herbId: string
    herbName: string
    proportion: string
  }[]
  benefits: string[]
  symptoms: string[]
  dosage: string
  preparation: string
  contraindications: string[]
  researchStudies: { title: string; year: number }[]
}

export const koreanFormulas: HerbFormula[] = [
  {
    id: "korean-formula-001",
    name: "Six Ingredient Rehmannia Formula (Liu Wei Di Huang Wan)",
    system: "korean",
    category: "Yin Tonification",
    description:
      "Classic formula for nourishing yin fluids and tonifying kidney function, addressing deficiency heat patterns",
    ingredients: [
      { herbId: "korean-rehmannia-004", herbName: "Prepared Rehmannia", proportion: "24%" },
      { herbId: "korean-dioscorea-015", herbName: "Chinese Yam", proportion: "16%" },
      { herbId: "korean-goji-007", herbName: "Goji Berry", proportion: "12%" },
    ],
    benefits: [
      "Tonifies kidney and liver yin",
      "Cools deficiency heat",
      "Nourishes bone marrow",
      "Improves complexion",
      "Supports hormonal balance",
    ],
    symptoms: [
      "night sweats",
      "hot flashes",
      "dry mouth",
      "low grade fever",
      "poor sleep",
      "menopausal symptoms",
    ],
    dosage: "6-9 grams daily in divided doses",
    preparation: "Decoct for 30-40 minutes, take warm",
    contraindications: ["weak digestion", "loose stools", "cold constitution"],
    researchStudies: [
      { title: "Liu Wei Di Huang for Yin Deficiency", year: 2020 },
      { title: "Traditional Formula for Menopausal Support", year: 2021 },
    ],
  },
  {
    id: "korean-formula-002",
    name: "Ginseng and Astragalus Formula (Si Jun Zi Tang)",
    system: "korean",
    category: "Qi Tonification",
    description:
      "Powerful immune-boosting formula combining supreme tonics to rebuild energy and strengthen defense",
    ingredients: [
      { herbId: "korean-ginseng-001", herbName: "Korean Ginseng", proportion: "20%" },
      { herbId: "korean-astragalus-003", herbName: "Astragalus", proportion: "25%" },
      { herbId: "korean-licorice-013", herbName: "Licorice Root", proportion: "10%" },
      { herbId: "korean-dioscorea-015", herbName: "Chinese Yam", proportion: "15%" },
    ],
    benefits: [
      "Powerful qi tonic",
      "Builds immunity",
      "Increases energy",
      "Improves appetite",
      "Supports recovery",
      "Builds strength",
    ],
    symptoms: [
      "severe fatigue",
      "frequent colds",
      "weak immunity",
      "loss of appetite",
      "poor recovery",
      "weak digestion",
    ],
    dosage: "9-12 grams daily in divided doses",
    preparation: "Decoct for 30-40 minutes, take warm",
    contraindications: ["acute infection", "high fever"],
    researchStudies: [
      { title: "Si Jun Zi Tang for Qi Support", year: 2021 },
      { title: "Ginseng and Astragalus Synergy", year: 2020 },
    ],
  },
  {
    id: "korean-formula-003",
    name: "Warming Blood Circulation Formula",
    system: "korean",
    category: "Blood Invigoration",
    description:
      "Combination designed to move blood stagnation, warm channels, and promote healthy circulation",
    ingredients: [
      { herbId: "korean-ginger-014", herbName: "Dried Ginger", proportion: "15%" },
      { herbId: "korean-notoginseng-011", herbName: "Notoginseng", proportion: "12%" },
      { herbId: "korean-angelica-016", herbName: "Angelica Root", proportion: "18%" },
      { herbId: "korean-eucommia-006", herbName: "Eucommia Bark", proportion: "12%" },
    ],
    benefits: [
      "Moves blood stagnation",
      "Relieves pain",
      "Warms channels",
      "Improves circulation",
      "Reduces bruising",
      "Eases joint pain",
    ],
    symptoms: [
      "pain from stagnation",
      "bruising",
      "poor circulation",
      "joint pain",
      "menstrual cramps",
      "muscle tension",
    ],
    dosage: "6-9 grams daily in divided doses",
    preparation: "Decoct for 30 minutes, take warm",
    contraindications: ["bleeding disorders", "during menstruation"],
    researchStudies: [
      { title: "Blood Moving Herbs for Pain Relief", year: 2020 },
      { title: "Circulation Formula Efficacy", year: 2021 },
    ],
  },
  {
    id: "korean-formula-004",
    name: "Immune Shield Formula (Ba Wei Di Huang Wan)",
    system: "korean",
    category: "Immune Support",
    description:
      "Advanced immunity-building formula combining warming and tonifying herbs for comprehensive defense",
    ingredients: [
      { herbId: "korean-astragalus-003", herbName: "Astragalus", proportion: "20%" },
      { herbId: "korean-cordyceps-008", herbName: "Cordyceps Mushroom", proportion: "15%" },
      { herbId: "korean-eucommia-006", herbName: "Eucommia Bark", proportion: "10%" },
      { herbId: "korean-ginseng-001", herbName: "Korean Ginseng", proportion: "15%" },
    ],
    benefits: [
      "Strengthens immune response",
      "Builds protective qi",
      "Increases energy",
      "Supports respiratory health",
      "Improves recovery",
      "Prevents illness",
    ],
    symptoms: [
      "weak immunity",
      "frequent infections",
      "fatigue",
      "low energy",
      "respiratory issues",
      "slow recovery",
    ],
    dosage: "9-12 grams daily",
    preparation: "Decoct 40 minutes, traditionally before meals",
    contraindications: ["acute infections", "high fever"],
    researchStudies: [
      { title: "Traditional Immune Formulas", year: 2021 },
      { title: "Immune Enhancement with Herbal Combinations", year: 2020 },
    ],
  },
  {
    id: "korean-formula-005",
    name: "Women's Balance Formula",
    system: "korean",
    category: "Women's Health",
    description:
      "Specialized formula for menstrual health and hormonal balance using classic women-tonifying herbs",
    ingredients: [
      { herbId: "korean-dang-gui-012", herbName: "Dong Quai", proportion: "18%" },
      { herbId: "korean-mugwort-002", herbName: "Korean Mugwort", proportion: "15%" },
      { herbId: "korean-rehmannia-004", herbName: "Prepared Rehmannia", proportion: "16%" },
      { herbId: "korean-ginger-014", herbName: "Dried Ginger", proportion: "8%" },
    ],
    benefits: [
      "Regulates menstrual cycle",
      "Nourishes blood",
      "Relieves cramps",
      "Supports fertility",
      "Balances hormones",
      "Improves complexion",
    ],
    symptoms: [
      "irregular periods",
      "menstrual cramps",
      "poor blood",
      "pale complexion",
      "infertility",
      "hormonal imbalance",
    ],
    dosage: "6-9 grams daily",
    preparation: "Decoct 30 minutes, avoid during menstruation",
    contraindications: ["excessive bleeding", "during heavy menstruation"],
    researchStudies: [
      { title: "Herbal Formula for Menstrual Health", year: 2021 },
      { title: "Women's Tonics in Korean Medicine", year: 2020 },
    ],
  },
]

export const ayurvedicFormulas: HerbFormula[] = [
  {
    id: "ayurvedic-formula-001",
    name: "Ashwagandha Vata Pacifying Formula",
    system: "ayurvedic",
    category: "Vata Balancing",
    description:
      "Traditional Ayurvedic formula designed to calm vata dosha and promote grounding and stability",
    ingredients: [
      { herbId: "ayurvedic-ashwagandha-001", herbName: "Ashwagandha", proportion: "25%" },
      { herbId: "ayurvedic-shatavari-007", herbName: "Shatavari", proportion: "20%" },
      { herbId: "ayurvedic-ginger-005", herbName: "Fresh Ginger", proportion: "10%" },
    ],
    benefits: [
      "Calms vata dosha",
      "Reduces anxiety",
      "Improves sleep",
      "Grounds scattered energy",
      "Supports nervous system",
      "Enhances vitality",
    ],
    symptoms: [
      "vata imbalance",
      "anxiety",
      "insomnia",
      "scattered mind",
      "restlessness",
      "low energy",
      "poor focus",
    ],
    dosage: "3-6 grams daily",
    preparation: "Steep in warm milk with honey",
    contraindications: ["high kapha", "heavy digestion"],
    researchStudies: [
      { title: "Vata Pacifying Formulas in Ayurveda", year: 2021 },
      { title: "Ashwagandha-based Anxiolytic Formulas", year: 2020 },
    ],
  },
  {
    id: "ayurvedic-formula-002",
    name: "Pitta Cool Down Formula",
    system: "ayurvedic",
    category: "Pitta Cooling",
    description:
      "Cooling formula to balance excess pitta and reduce inflammatory and heat-related conditions",
    ingredients: [
      { herbId: "ayurvedic-turmeric-002", herbName: "Turmeric", proportion: "15%" },
      { herbId: "ayurvedic-brahmi-003", herbName: "Brahmi", proportion: "20%" },
      { herbId: "ayurvedic-neem-009", herbName: "Neem", proportion: "15%" },
      { herbId: "ayurvedic-aloe-vera-015", herbName: "Aloe Vera", proportion: "12%" },
    ],
    benefits: [
      "Cools pitta dosha",
      "Reduces inflammation",
      "Clears skin",
      "Supports digestion",
      "Calms emotions",
      "Reduces fever",
    ],
    symptoms: [
      "pitta excess",
      "inflammation",
      "skin conditions",
      "excessive heat",
      "irritability",
      "acid reflux",
      "fever",
    ],
    dosage: "4-8 grams daily",
    preparation: "Decoct with cooling herbs, take cool",
    contraindications: ["kapha excess", "cold digestion"],
    researchStudies: [
      { title: "Pitta Balancing in Ayurvedic Practice", year: 2021 },
      { title: "Cooling Herbal Combinations", year: 2020 },
    ],
  },
  {
    id: "ayurvedic-formula-003",
    name: "Digestive Fire Formula (Agni Vardhak)",
    system: "ayurvedic",
    category: "Digestive Support",
    description:
      "Formula designed to kindle digestive fire and promote optimal metabolism and nutrient absorption",
    ingredients: [
      { herbId: "ayurvedic-trikatu-yoga-013", herbName: "Trikatu", proportion: "18%" },
      { herbId: "ayurvedic-ginger-005", herbName: "Fresh Ginger", proportion: "15%" },
      { herbId: "ayurvedic-holy-basil-006", herbName: "Holy Basil", proportion: "12%" },
    ],
    benefits: [
      "Stimulates digestive fire",
      "Removes ama (toxins)",
      "Improves metabolism",
      "Increases appetite",
      "Supports weight management",
      "Anti-parasitic",
    ],
    symptoms: [
      "sluggish digestion",
      "ama accumulation",
      "bloating",
      "poor appetite",
      "weight gain",
      "parasitic infection",
      "sluggishness",
    ],
    dosage: "2-4 grams daily with meals",
    preparation: "Take with warm water or in food",
    contraindications: ["high pitta", "sensitive digestion", "ulcers"],
    researchStudies: [
      { title: "Agni Enhancement in Ayurveda", year: 2021 },
      { title: "Digestive Fire and Metabolism", year: 2020 },
    ],
  },
  {
    id: "ayurvedic-formula-004",
    name: "Joint Rejuvenation Formula",
    system: "ayurvedic",
    category: "Joint & Bone Health",
    description:
      "Comprehensive formula combining guggul, warming spices and circulation-enhancing herbs for joint support",
    ingredients: [
      { herbId: "ayurvedic-guggul-008", herbName: "Guggul", proportion: "20%" },
      { herbId: "ayurvedic-ginger-005", herbName: "Fresh Ginger", proportion: "12%" },
      { herbId: "ayurvedic-turmeric-002", herbName: "Turmeric", proportion: "18%" },
      { herbId: "ayurvedic-dashmool-012", herbName: "Dashmool", proportion: "15%" },
    ],
    benefits: [
      "Supports joint health",
      "Reduces arthritis",
      "Relieves inflammation",
      "Improves mobility",
      "Detoxifies tissues",
      "Supports bone health",
    ],
    symptoms: [
      "arthritis",
      "joint pain",
      "stiffness",
      "inflammation",
      "poor mobility",
      "bone weakness",
      "muscle tension",
    ],
    dosage: "6-9 grams daily",
    preparation: "Decoct 30 minutes, take warm",
    contraindications: ["high pitta", "diarrhea", "bleeding disorders"],
    researchStudies: [
      { title: "Guggul Combinations for Joint Support", year: 2021 },
      { title: "Arthritis Management with Ayurvedic Formulas", year: 2020 },
    ],
  },
  {
    id: "ayurvedic-formula-005",
    name: "Triphala Plus Formula (Enhanced Detox)",
    system: "ayurvedic",
    category: "Detoxification",
    description:
      "Enhanced detoxification formula combining three fruits with additional herbs for deep cleansing",
    ingredients: [
      { herbId: "ayurvedic-triphala-004", herbName: "Triphala", proportion: "40%" },
      { herbId: "ayurvedic-neem-009", herbName: "Neem", proportion: "15%" },
      { herbId: "ayurvedic-turmeric-002", herbName: "Turmeric", proportion: "12%" },
      { herbId: "ayurvedic-holy-basil-006", herbName: "Holy Basil", proportion: "10%" },
    ],
    benefits: [
      "Deep detoxification",
      "Cleanses digestive tract",
      "Removes toxins",
      "Supports liver function",
      "Improves digestion",
      "Balances all doshas",
    ],
    symptoms: [
      "toxin accumulation",
      "sluggish digestion",
      "poor elimination",
      "weak digestion",
      "liver congestion",
      "skin conditions",
      "constipation",
    ],
    dosage: "3-6 grams daily at bedtime",
    preparation: "Soak in water overnight or decoct gently",
    contraindications: ["pregnancy", "excessive diarrhea"],
    researchStudies: [
      { title: "Triphala-based Detox Formulas", year: 2021 },
      { title: "Enhanced Cleansing with Ayurvedic Herbs", year: 2020 },
    ],
  },
]

export function getFormulaById(id: string): HerbFormula | undefined {
  const allFormulas = [...koreanFormulas, ...ayurvedicFormulas]
  return allFormulas.find((formula) => formula.id === id)
}

export function getFormulasBySystem(system: "korean" | "ayurvedic"): HerbFormula[] {
  if (system === "korean") return koreanFormulas
  return ayurvedicFormulas
}

export function getFormulasByCategory(category: string): HerbFormula[] {
  const allFormulas = [...koreanFormulas, ...ayurvedicFormulas]
  return allFormulas.filter((formula) =>
    formula.category.toLowerCase().includes(category.toLowerCase())
  )
}

export function searchFormulas(query: string): HerbFormula[] {
  const allFormulas = [...koreanFormulas, ...ayurvedicFormulas]
  const lowerQuery = query.toLowerCase()
  return allFormulas.filter(
    (formula) =>
      formula.name.toLowerCase().includes(lowerQuery) ||
      formula.symptoms.some((s) => s.toLowerCase().includes(lowerQuery)) ||
      formula.benefits.some((b) => b.toLowerCase().includes(lowerQuery)) ||
      formula.category.toLowerCase().includes(lowerQuery)
  )
}
