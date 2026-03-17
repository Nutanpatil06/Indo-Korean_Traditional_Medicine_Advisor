'use client'

import { useContext } from 'react'

interface StorageContextType {
  medicineSystem: 'korean' | 'ayurvedic' | 'integrated'
  setMedicineSystem: (system: 'korean' | 'ayurvedic' | 'integrated') => void
}

// Default export for context creation
export const useLocalStorage = (): StorageContextType => {
  try {
    const storedSystem = typeof window !== 'undefined' ? localStorage.getItem('medicineSystem') : null
    const system = (storedSystem as any) || 'integrated'

    const setMedicineSystem = (newSystem: 'korean' | 'ayurvedic' | 'integrated') => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('medicineSystem', newSystem)
      }
    }

    return {
      medicineSystem: system,
      setMedicineSystem,
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error)
    return {
      medicineSystem: 'integrated',
      setMedicineSystem: () => {},
    }
  }
}
