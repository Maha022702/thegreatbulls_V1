import { create } from 'zustand'

interface UserState {
  user: any
  setUser: (user: any) => void
  watchlist: string[]
  addToWatchlist: (ticker: string) => void
  removeFromWatchlist: (ticker: string) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  watchlist: [],
  addToWatchlist: (ticker) => set((state) => ({ watchlist: [...state.watchlist, ticker] })),
  removeFromWatchlist: (ticker) => set((state) => ({ watchlist: state.watchlist.filter(t => t !== ticker) }))
}))