"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type MedicineSystem = "korean" | "ayurvedic" | "integrated"

interface MedicineSystemContextType {
  system: MedicineSystem
  setSystem: (system: MedicineSystem) => void
}

const MedicineSystemContext = createContext<MedicineSystemContextType | undefined>(undefined)

export function MedicineSystemProvider({ children }: { children: ReactNode }) {
  const [system, setSystem] = useState<MedicineSystem>("integrated")

  return <MedicineSystemContext.Provider value={{ system, setSystem }}>{children}</MedicineSystemContext.Provider>
}

export function useMedicineSystem() {
  const context = useContext(MedicineSystemContext)
  if (context === undefined) {
    throw new Error("useMedicineSystem must be used within a MedicineSystemProvider")
  }
  return context
}
