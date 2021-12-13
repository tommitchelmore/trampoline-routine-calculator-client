import create from 'zustand'

const useStore = create(set => ({
  user: null,
  login: user => set(state => ({ user })),
  logout: user => set(state => ({ user: null }))
}))

export const useUser = useStore