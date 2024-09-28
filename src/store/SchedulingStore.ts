import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type Scheduling = {
  hour: string
  date: string
}

type SchedulingStore = {
  scheduling: Scheduling
  setScheduling: (user: Scheduling) => void
  removeScheduling: () => void
}

export const useSchedulingStore = create<SchedulingStore>()(
  devtools(
    persist(
      (set) => {
        return {
          scheduling: { hour: '', date: '' },
          setScheduling: (scheduling) => set({ scheduling }),
          removeScheduling: () => set({ scheduling: { hour: '', date: '' } }),
        }
      },
      {
        name: 'client-scheduling-store', // nome da chave no armazenamento local
        getStorage: () => localStorage, // ou sessionStorage
      },
    ),
  ),
)
