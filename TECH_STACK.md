# Technology Stack & Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js App Router | React Components | TypeScript   │   │
│  │  Shadcn/ui | Tailwind CSS | Emotion CSS             │   │
│  │  GSAP Animations | Framer Motion                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               STATE MANAGEMENT & LOGIC LAYER                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Context API | Custom Hooks | Zustand Store         │   │
│  │  Recommendation Engine | Validation Logic            │   │
│  │  Data Processing & Analytics                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              API & BACKEND SERVICES LAYER                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Route Handlers | Server Actions                      │   │
│  │  Firebase Integration | Python ML Service             │   │
│  │  Herb Database | Interaction Checker                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  DATA & PERSISTENCE LAYER                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Firebase Firestore | User Profiles                  │   │
│  │  Herb Database | Symptom Records                      │   │
│  │  Analytics Data | Community Forums                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Technologies

### Core Framework
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | Full-stack React framework with SSR | 14+ |
| **React** | UI component library | 18+ |
| **TypeScript** | Type-safe JavaScript | 5+ |
| **Tailwind CSS** | Utility-first CSS framework | 3+ |
| **Shadcn/ui** | Pre-built, accessible components | Latest |

### Styling & Animation
| Technology | Purpose |
|-----------|---------|
| **Emotion CSS** | CSS-in-JS for dynamic styling |
| **GSAP** | Advanced animations & timelines |
| **Framer Motion** | React animation library |
| **CSS Modules** | Scoped component styling |

### Data Visualization
| Technology | Purpose |
|-----------|---------|
| **Chart.js** | Data visualization charts |
| **React Three Fiber** | 3D rendering & models |
| **Recharts** | React-based charting |
| **SVG** | Scalable vector graphics |

### UI Components & Icons
| Technology | Purpose |
|-----------|---------|
| **Lucide React** | Modern icon library |
| **Radix UI** | Unstyled component primitives |
| **Headless UI** | Accessible component patterns |
| **Recharts** | React charting library |

---

## State Management

### Approach
- **Global State**: React Context API + Custom hooks
- **Local State**: useState for component-level state
- **Persistent State**: localStorage (with Firebase sync planned)
- **Store Pattern**: Custom Zustand store for health profiles

### Key Stores
```typescript
// Medicine System Store
- activeSystem: 'korean' | 'ayurvedic'
- medicineSystemHistory: []

// Health Profile Store
- healthProfile: {
    fullName, age, gender, dateOfBirth,
    primaryCondition, allergies, medications,
    constitutionType, dosha, energyLevel
  }

// Symptom Tracker Store
- symptoms: [{
    name, severity, duration, frequency,
    date, system, notes
  }]

// Recommendation Store
- recommendations: [{
    remedyName, ingredients, benefits,
    dosage, preparation, safetyRating
  }]
```

---

## Backend Architecture

### Firebase Services
```
Firebase Project
├── Authentication
│   ├── Email/Password auth
│   ├── Session management
│   └── User profiles
│
├── Firestore Database
│   ├── users/{userId}
│   ├── symptoms/{userId}/logs
│   ├── recommendations/{userId}
│   ├── forum/threads
│   └── practitioners
│
└── Storage
    ├── User uploads
    └── Document storage
```

### Python ML Service
```
Machine Learning Pipeline
├── Data Processing
│   ├── Symptom analysis
│   ├── Natural language processing
│   └── Pattern recognition
│
├── Recommendation Engine
│   ├── Symptom-to-remedy matching
│   ├── Severity assessment
│   └── Interaction prediction
│
└── Analytics
    ├── Effectiveness tracking
    ├── Trend analysis
    └── Personalization
```

---

## Database Schema

### Users Collection
```json
{
  "userId": "unique_id",
  "email": "user@example.com",
  "profile": {
    "fullName": "string",
    "age": "number",
    "gender": "string",
    "dateOfBirth": "timestamp",
    "medicineSystemPreference": "korean|ayurvedic|both"
  },
  "health": {
    "primaryConditions": ["string"],
    "allergies": ["string"],
    "medications": ["string"],
    "constitution": "string"
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Symptoms Collection
```json
{
  "symptomId": "unique_id",
  "userId": "user_id",
  "symptom": "string",
  "severity": 1-10,
  "duration": "string",
  "frequency": "string",
  "date": "timestamp",
  "medicineSystem": "korean|ayurvedic",
  "notes": "string"
}
```

### Remedies Collection
```json
{
  "remedyId": "unique_id",
  "name": "string",
  "medicineSystem": "korean|ayurvedic",
  "ingredients": ["string"],
  "benefits": ["string"],
  "dosage": "string",
  "preparation": "string",
  "safetyRating": 1-5,
  "contraindications": ["string"],
  "researchBacked": true/false
}
```

---

## API Endpoints

### Recommendation Routes
```
POST /api/recommend
- Input: symptoms, health profile
- Output: herb recommendations

POST /api/check-interactions
- Input: herbs, medications
- Output: safety assessment

GET /api/remedies/:id
- Output: detailed remedy information
```

### User Routes
```
POST /api/user/profile
- Create/update user profile

GET /api/user/health-history
- Retrieve symptom history

POST /api/user/symptoms
- Log new symptom
```

### Community Routes
```
GET /api/forum/threads
- Retrieve forum discussions

POST /api/forum/threads
- Create new discussion

POST /api/forum/replies
- Reply to discussion
```

---

## Component Architecture

```
App
├── Layout
│   ├── Header
│   ├── Navigation
│   └── Footer
│
├── HeroSection
│   ├── ImageCarousel
│   └── CTAButtons
│
├── MedicineSystemSelector
│   ├── KoreanMedicine
│   └── AyurvedicMedicine
│
├── HerbalRemedyAdvisor
│   ├── SymptomInput
│   ├── HealthProfile
│   └── RecommendationResults
│
├── FeatureHighlights
│   ├── HealthProfile
│   ├── SymptomTracker
│   ├── HerbInteractionChecker
│   ├── EducationalResources
│   ├── PractitionerFinder
│   ├── CommunityForum
│   ├── ProgressAnalytics
│   └── AIInsights
│
├── SeasonalRecommendations
│   ├── WeatherBasedTips
│   └── SeasonalProtocols
│
└── ResearchSection
    ├── StudiesDisplay
    └── ResearchLinks
```

---

## Performance Optimizations

1. **Code Splitting**: Dynamic imports for heavy components
2. **Image Optimization**: Next.js Image component with lazy loading
3. **Caching**: Browser caching + Firebase caching strategies
4. **Compression**: GZIP compression for assets
5. **Bundle Analysis**: Tree-shaking unused code
6. **Database Indexing**: Firestore indexes for fast queries
7. **Lazy Loading**: Components load only when needed

---

## Security Measures

1. **Authentication**: Firebase Auth with secure sessions
2. **Encryption**: Data encryption in transit & at rest
3. **Validation**: Client-side & server-side input validation
4. **CORS**: Cross-origin request protection
5. **Rate Limiting**: API rate limiting
6. **HTTPS**: All communications encrypted
7. **Data Privacy**: User data is never shared without consent

---

## Development Workflow

```
Development
    ├── Local Development: npm run dev
    ├── Testing: npm run test
    ├── Linting: npm run lint
    └── Type Checking: npm run type-check

Build Process
    ├── Compilation: Next.js build
    ├── Optimization: Tree-shaking & minification
    └── Output: .next directory

Deployment
    ├── Platform: Vercel (recommended)
    ├── CI/CD: GitHub Actions
    └── Monitoring: Sentry + Analytics
```

---

## Dependencies Summary

### Core
- next, react, react-dom, typescript

### UI & Styling
- tailwindcss, @emotion/react, @emotion/styled, framer-motion

### Animation
- gsap, react-spring

### State & Data
- zustand, date-fns

### Visualization
- chart.js, react-chartjs-2, @react-three/fiber, @react-three/drei

### Icons & Components
- lucide-react, shadcn/ui

### Backend
- firebase, firebase-admin

### Development
- eslint, prettier, @types/node, @types/react

---

## Scalability Considerations

1. **Database**: Firestore auto-scales, consider sharding for high volume
2. **API**: Serverless functions scale automatically
3. **CDN**: Vercel's edge network for global distribution
4. **Caching**: Redis for frequently accessed data
5. **Load Balancing**: Automatic with serverless architecture

---

## Monitoring & Analytics

- **Application**: Google Analytics for user behavior
- **Performance**: Web Vitals monitoring
- **Errors**: Sentry for error tracking
- **Backend**: Firebase Analytics & Logging
- **Database**: Firestore monitoring dashboard

---

**Last Updated**: February 2026
