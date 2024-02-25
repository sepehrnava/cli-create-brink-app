import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ISTATE {
  change: (newState: Partial<ISTATE>) => void;
}

interface IPERSISTSTATE {
  change: (newState: Partial<IPERSISTSTATE>) => void;
}

export const usePersistStore = create<IPERSISTSTATE>()(
  devtools(
    persist(
      (set) => ({
        change: (newState) => set(newState),
      }),
      {
        name: 'persist-storage',
      }
    )
  )
);

export const useStore = create<ISTATE>()(
  devtools(
    (set) => ({
      change: (newState) => {
        return set(newState);
      },
    }),
    {
      name: 'storage',
    }
  )
);
